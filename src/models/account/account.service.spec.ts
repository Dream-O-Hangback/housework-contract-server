import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { AccountService } from './account.service';
import Account from '../account/entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: jest.fn(),
});

describe('AccountService', () => {
    let accountService: AccountService;
    let accountRepository: MockRepository<Account>;

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AccountService,
                { provide: getRepositoryToken(Account), useValue: mockRepository() },
            ],
        }).compile();

        accountService = moduleRef.get<AccountService>(AccountService);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
    });

    it('should get active account by nickname', async () => {
        const nickname = faker.internet.email();
        const account = { id: faker.datatype.uuid() };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getActiveAccountByNickname({ nickname });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ nickname, active: true });
    });
});
