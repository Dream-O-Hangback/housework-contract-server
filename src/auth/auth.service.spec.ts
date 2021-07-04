import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import { AuthService } from './auth.service';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import AccountDto from './dto/account.dto';
import CodeDto from './dto/code.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
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

    it('should get account by email', async () => {
        const email = faker.internet.email();
        const account = { id: faker.datatype.uuid() };

        const findOneAccount = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await authService.getAccountByEmail({ email });
        
        expect(result).toBe(account as Account);
        expect(findOneAccount).toBeCalledTimes(1);
    });

    it('should create a new account', async () => {
        const accountDto: AccountDto = {
            "email": faker.internet.email(),
            "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "password": faker.datatype.string(),
            "nickname": faker.random.word(),
            "profile": faker.random.word(),
            "type": "local",
            "notificationOpen": true,
            "emailOpen": true,
        };

        const currentDate = new Date();

        const originalPassword = accountDto.password;
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        const newAccount = {
            ...accountDto,
            "password": hashedPassword,
            "profileImageUrl": "",
            "notificationOpenDate": currentDate,
            "emailOpenDate": currentDate,
            "lastUpdateDate": currentDate,
            "createDate": currentDate,
        }

        const saveAccount = jest.spyOn(accountRepository, 'save').mockResolvedValueOnce(newAccount as Account);
        const result = await authService.createAccount(accountDto);

        expect(await bcrypt.compare(originalPassword, hashedPassword)).toBe(true);
        expect(result).toBe(newAccount as Account);
        expect(saveAccount).toBeCalledTimes(1);
    });

    it('should create(upsert) a certification code', async () => {
        const accountId = faker.datatype.uuid();
        const email = faker.internet.email();

        const code = generateKey();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const newCertificationCode = {
            accountId,
            email,
            code,
            expireDate,
        };

        const findOneCertificationCode = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(null);
        const saveCertificationCode = jest.spyOn(certificationCodeRepository, 'save').mockResolvedValueOnce(newCertificationCode);

        const resultCertificationCode = await authService.upsertCertificationCode({ accountId, email });

        expect(resultCertificationCode).toBe(newCertificationCode as CertificationCode);
        expect(findOneCertificationCode).toBeCalledTimes(1);
        expect(saveCertificationCode).toBeCalledTimes(1);
    });

    it('should get a certification code', async () => {
        const codeDto: CodeDto = {
            "email": faker.internet.email(),
            "code": faker.datatype.string(10)
        };
        const { email, code } = codeDto;

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const certificationCode = {
            ...codeDto,
            accountId: faker.datatype.uuid(),
            expireDate,
        };

        const findOneCertificationCode = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(certificationCode as CertificationCode);

        const resultCertificationCode = await authService.getCeritificationCode({
            email,
            code
        } as CodeDto);

        expect(resultCertificationCode).toBe(certificationCode as CertificationCode);
        expect(findOneCertificationCode).toBeCalledTimes(1);
    });

    it('should update active field account', async () => {
        const id = faker.datatype.uuid();

        const account = {
            id,
            active: true,
        };

        const updateAccountActive = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(account as Account);

        await authService.updateAccountActive({ id });

        expect(updateAccountActive).toBeCalledTimes(1);
    });
});
