import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { AuthService } from './auth.service';
import { AccountService } from '../models/account/account.service';
import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';
import Account from '../models/account/entities';
import RefreshToken from '../models/refreshToken/entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: JwtService;
    let accountRepository: MockRepository<Account>;
    let refreshTokenRepository: MockRepository<RefreshToken>;

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                ConfigService,
                JwtService,
                AccountService,
                RefreshTokenService,
                { provide: getRepositoryToken(Account), useValue: mockRepository() },
                { provide: getRepositoryToken(RefreshToken), useValue: mockRepository() },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
        refreshTokenRepository = moduleRef.get(getRepositoryToken(RefreshToken));
    });

    it('should validate a account', async () => {
        const email = faker.internet.email();
        const password = faker.datatype.string();

        const account = { id: faker.datatype.uuid(), password };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await authService.validateAccount(email, password);
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email, active: true });
    });

    it('should issue a access token', async () => {
        const id = faker.datatype.uuid();

        const accessToken = faker.datatype.string();
        const refreshToken = faker.datatype.string();

        const jwtServiceSignSpyForAccessToken = jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);
        const jwtServiceSignSpyForRefreshToken = jest.spyOn(jwtService, 'sign').mockReturnValue(refreshToken);

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);

        const refreshTokenRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(undefined);
        const refreshTokenRepositorySaveSpy = jest.spyOn(accountRepository, 'save').mockResolvedValueOnce({
            accountId: id,
            token: refreshToken,
            expireDate: currentDate,
        });

        const result = await authService.issueAccessToken({ id });
        
        expect(result).toBe({ accessToken });
        expect(jwtServiceSignSpyForAccessToken).toBeCalledTimes(1);
        expect(jwtServiceSignSpyForAccessToken).toHaveBeenCalledWith(expect.objectContaining({ id }));
        expect(jwtServiceSignSpyForRefreshToken).toBeCalledTimes(1);
        expect(jwtServiceSignSpyForRefreshToken).toHaveBeenCalledWith(expect.objectContaining({ id }));
        expect(refreshTokenRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(refreshTokenRepositoryFindOneSpy).toHaveBeenCalledWith({ accountId: id });
        expect(refreshTokenRepositorySaveSpy).toBeCalledTimes(1);
        expect(refreshTokenRepositorySaveSpy).toHaveBeenCalledWith({
            accountId: id,
            token: refreshToken,
            expireDate: currentDate,
        });
    });

    it('should verify a access token', async () => {
        const accessToken = faker.datatype.string();
        const payload = { id: faker.datatype.uuid() };

        const jwtServiceVerifySpy = jest.spyOn(jwtService, 'verify').mockReturnValueOnce(payload);
        
        const result = authService.verifyAccessToken(accessToken);
        
        expect(result).toBe(payload);
        expect(jwtServiceVerifySpy).toBeCalledTimes(1);
        expect(jwtServiceVerifySpy).toHaveBeenCalledWith(expect.stringMatching(accessToken));
    });

    it('should reset a refresh token', async () => {
        const id = faker.datatype.uuid();

        const refreshTokenDeleteSpy = jest.spyOn(refreshTokenRepository, 'delete').mockResolvedValueOnce(undefined);
        
        await authService.resetRefreshToken({ id });
        
        expect(refreshTokenDeleteSpy).toBeCalledTimes(1);
        expect(refreshTokenDeleteSpy).toHaveBeenCalledWith({ id, active: true });
    });
});
