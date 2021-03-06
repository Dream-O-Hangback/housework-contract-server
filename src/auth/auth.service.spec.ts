import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { AccountService } from '@models/account/account.service';
import { RefreshTokenService } from '@models/refreshToken/refreshToken.service';
import Account from '@models/account/entities';
import RefreshToken from '@models/refreshToken/entities';
import { AuthService } from './auth.service';

const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
};

const mockConfigService = {
    get(key: string) {
        switch (key) {
            case 'JWT_ISSUER':
            case 'JWT_REFRESH_SECRET':
                return faker.datatype.string();
            case 'JWT_REFRESH_EXPIRES_IN':
                return '60s';
            default:
                return undefined;
        }
    }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const executeSpy = jest.fn().mockResolvedValue(new InsertResult());

const mockRepository = () => ({
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        orUpdate: jest.fn().mockReturnThis(),
        execute: executeSpy,
    })),
});

describe('AuthService', () => {
    let jwtService: JwtService;
    let authService: AuthService;
    let accountRepository: MockRepository<Account>;
    let refreshTokenRepository: MockRepository<RefreshToken>;

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                AccountService,
                RefreshTokenService,
                { provide: ConfigService, useValue: mockConfigService },
                { provide: JwtService, useValue: mockJwtService },
                { provide: getRepositoryToken(Account), useValue: mockRepository() },
                { provide: getRepositoryToken(RefreshToken), useValue: mockRepository() },
            ],
        }).compile();
        
        jwtService = moduleRef.get<JwtService>(JwtService);
        authService = moduleRef.get<AuthService>(AuthService);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
        refreshTokenRepository = moduleRef.get(getRepositoryToken(RefreshToken));
    });

    it('should validate a account', async () => {
        const email = faker.internet.email();
        const password = faker.datatype.string();

        const account = { id: faker.datatype.uuid(), password };

        const encryptedPassword = await bcrypt.hash(password, (await bcrypt.genSalt()));

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce({ id: account.id, password: encryptedPassword });
        
        const result = await authService.validateAccount(email, password);
        
        expect(result).toStrictEqual({ id: account.id } as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email, active: true });
    });

    it('should validate a account and return null', async () => {
        const email = faker.internet.email();
        const password = faker.datatype.string();

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(null);
        
        const result = await authService.validateAccount(email, password);
        
        expect(result).toEqual(null);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(2);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email, active: true });
    });

    it('should issue a access token', async () => {
        const id = faker.datatype.uuid();

        const accessToken = faker.datatype.string();
        const refreshToken = faker.datatype.string();

        const jwtServiceSignSpyForAccessToken = jest.spyOn(jwtService, 'sign').mockReturnValueOnce(accessToken);
        const jwtServiceSignSpyForRefreshToken = jest.spyOn(jwtService, 'sign').mockReturnValueOnce(refreshToken);

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);
        
        const result = await authService.issueAccessToken({ id });
        
        expect(result).toStrictEqual({ accessToken });
        expect(jwtServiceSignSpyForAccessToken).toBeCalledTimes(2);
        expect(jwtServiceSignSpyForAccessToken).toHaveBeenCalledWith(expect.objectContaining({ id }), expect.anything());
        expect(jwtServiceSignSpyForRefreshToken).toBeCalledTimes(2);
        expect(jwtServiceSignSpyForRefreshToken).toHaveBeenCalledWith(expect.objectContaining({ id }), expect.anything());
        expect(executeSpy).toBeCalledTimes(1);
    });

    it('should verify a access token', () => {
        const accessToken = faker.datatype.string();
        const payload = { id: faker.datatype.uuid() };

        const jwtServiceVerifySpy = jest.spyOn(jwtService, 'verify').mockReturnValueOnce(payload);
        
        const result = authService.verifyAccessToken(accessToken);
        
        expect(result).toBe(payload);
        expect(jwtServiceVerifySpy).toBeCalledTimes(1);
        expect(jwtServiceVerifySpy).toHaveBeenCalledWith(expect.stringContaining(accessToken), expect.anything());
    });

    it('should reset a refresh token', async () => {
        const id = faker.datatype.uuid();

        const refreshTokenDeleteSpy = jest.spyOn(refreshTokenRepository, 'delete').mockResolvedValueOnce(undefined);
        
        await authService.resetRefreshToken({ id });
        
        expect(refreshTokenDeleteSpy).toBeCalledTimes(1);
        expect(refreshTokenDeleteSpy).toHaveBeenCalledWith({ accountId: id });
    });
});
