import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import { AuthService } from './auth.service';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import AccountDto from './dto/account.dto';
import EmailCodeDto from './dto/emailCode.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    query: jest.fn(),
});

describe('AuthService', () => {
    let authService: AuthService;
    let accountRepository: MockRepository<Account>;
    let certificationCodeRepository: MockRepository<CertificationCode>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: getRepositoryToken(Account), useValue: mockRepository() },
                { provide: getRepositoryToken(CertificationCode), useValue: mockRepository() },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
        certificationCodeRepository = moduleRef.get(getRepositoryToken(CertificationCode));
    });

    describe('create a new account', () => {
        it('should create a new account', async () => {
            const accountDto: AccountDto = {
                "email": "kyw017763@gmail.com",
                "name": "A",
                "password": "ABCDE",
                "nickname": "A",
                "profile": "A",
                "type": "local",
                "notificationOpen": true,
                "emailOpen": true,
            };

            const currentDate = new Date();
            const newAccount = {
                ...accountDto,
                "profileImageUrl": "",
                "notificationOpenDate": currentDate,
                "emailOpenDate": currentDate,
                "lastUpdateDate": currentDate,
                "createDate": currentDate,
            }

            const saveAccount = jest.spyOn(accountRepository, 'save').mockResolvedValueOnce(newAccount as Account);
            const result = await authService.saveAccount(accountDto);

            expect(result).toBe(newAccount as Account);
            expect(saveAccount).toBeCalledTimes(1);
        });

        it('should get a encrypted password', async () => {
            const accountDto: AccountDto = {
                "email": "kyw017763@gmail.com",
                "name": "A",
                "password": "ABCDE",
                "nickname": "A",
                "profile": "A",
                "type": "local",
                "notificationOpen": true,
                "emailOpen": true,
            };
            const originalPassword = accountDto.password;
            const hashedPassword = await bcrypt.hash(originalPassword, 10);

            expect(await bcrypt.compare(originalPassword, hashedPassword)).toBe(true);
        });
    });

    describe('send a certification code to email', () => {
        it('should create a new certification code', async () => {
            const emailCodeDto: EmailCodeDto = {
                "email": "kyw017763@gmail.com",
            };

            const account = {
                id: 'id'
            };

            const key = generateKey();
            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);

            const newCertificationCode = {
                ...emailCodeDto,
                accountId: account.id,
                key,
                expireDate,
            };

            const findOneAccount = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
            const saveCertificationCode = jest.spyOn(certificationCodeRepository, 'query').mockResolvedValueOnce(newCertificationCode as CertificationCode);
            const certificationCodeResult = await authService.upsertCertificationCode(emailCodeDto);

            expect(certificationCodeResult).toBe(newCertificationCode as CertificationCode);
            expect(findOneAccount).toBeCalledTimes(1);
            expect(saveCertificationCode).toBeCalledTimes(1);
        });
    });
});
