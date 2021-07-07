import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import MockDate from 'mockdate';
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

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

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

    it('should get active account by email', async () => {
        const email = faker.internet.email();
        const account = { id: faker.datatype.uuid() };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await authService.getActiveAccountByEmail({ email });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email, active: true });
    });

    it('should get account by email', async () => {
        const email = faker.internet.email();
        const account = { id: faker.datatype.uuid() };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await authService.getAccountByEmail({ email });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email });
    });

    it('should create a new account', async () => {
        const accountData: AccountDto = {
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
        const originalPassword = accountData.password;
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        const newAccount = {
            ...accountData,
            "password": hashedPassword,
            "notificationOpenDate": currentDate,
            "emailOpenDate": currentDate,
            "lastUpdateDate": currentDate,
        }

        const accountRepositorySaveSpy = jest.spyOn(accountRepository, 'save').mockResolvedValueOnce(newAccount as Account);
        const result = await authService.createAccount(accountData);

        expect(await bcrypt.compare(originalPassword, hashedPassword)).toBe(true);
        expect(result).toBe(newAccount as Account);
        expect(accountRepositorySaveSpy).toBeCalledTimes(1);

        delete newAccount.password;
        expect(accountRepositorySaveSpy).toHaveBeenCalledWith(expect.objectContaining(newAccount));
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

        const certificationCodeRepositoryFindOneSpy = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(null);
        const certificationCodeRepositorySaveSpy = jest.spyOn(certificationCodeRepository, 'save').mockResolvedValueOnce(newCertificationCode);

        const resultCertificationCode = await authService.upsertCertificationCode({ accountId, email });

        expect(resultCertificationCode).toBe(newCertificationCode as CertificationCode);
        expect(certificationCodeRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositoryFindOneSpy).toHaveBeenCalledWith({ email });
        expect(certificationCodeRepositorySaveSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositorySaveSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                accountId,
                email,
                expireDate
            })
        );
    });

    it('should get a certification code', async () => {
        const codeData: CodeDto = {
            "email": faker.internet.email(),
            "code": faker.datatype.string(10)
        };
        const { email, code } = codeData;

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const certificationCode = {
            ...codeData,
            accountId: faker.datatype.uuid(),
            expireDate,
        };

        const certificationCodeRepositoryFindOneSpy = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(certificationCode as CertificationCode);

        const resultCertificationCode = await authService.getCeritificationCode({
            email,
            code
        } as CodeDto);

        expect(resultCertificationCode).toBe(certificationCode as CertificationCode);
        expect(certificationCodeRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositoryFindOneSpy).toHaveBeenCalledWith({
            email,
            code,
            expireDate: MoreThan(new Date())
        });
    });

    it('should update active field account', async () => {
        const id = faker.datatype.uuid();

        const account = {
            id,
            active: true,
        };

        const accountRepositoryUpdateSpy = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(account as Account);

        await authService.updateAccountActive({ id });

        expect(accountRepositoryUpdateSpy).toBeCalledTimes(1);
        expect(accountRepositoryUpdateSpy).toHaveBeenCalledWith({ id }, { active: true });
    });
});
