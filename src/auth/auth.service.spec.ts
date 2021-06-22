import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import Account from '../models/account/entities';
import AccountDto from './dto/account.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
});

describe('AuthService', () => {
    let authService: AuthService;
    let accountRepository: MockRepository<Account>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: getRepositoryToken(Account), useValue: mockRepository() }
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
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
                "createDate": currentDate
            }

            const saveAccount = jest.spyOn(accountRepository, 'save').mockResolvedValueOnce(newAccount as Account);

            const result = await authService.save(accountDto);

            expect(result).toBe(newAccount as Account);
            expect(saveAccount).toBeCalledTimes(1);
        });
    });
});