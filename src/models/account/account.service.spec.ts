import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { AccountService } from './account.service';
import Account from './entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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

    it('should create a new account', async () => {
        const accountData = {
            email: faker.internet.email(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            password: faker.datatype.string(),
            nickname: faker.random.word(),
            profile: faker.random.word(),
            type: 'local',
            notificationOpen: true,
            emailOpen: true,
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
        const result = await accountService.createItem(accountData);

        expect(await bcrypt.compare(originalPassword, hashedPassword)).toBe(true);
        expect(result).toBe(newAccount as Account);
        expect(accountRepositorySaveSpy).toBeCalledTimes(1);

        delete newAccount.password;
        expect(accountRepositorySaveSpy).toHaveBeenCalledWith(expect.objectContaining(newAccount));
    });

    it('should get a (active) account', async () => {
        const id = faker.datatype.uuid();
        const account = { id, active: true };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getItem({ id });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ id, active: true });
    });

    it('should get a active account by email', async () => {
        const email = faker.internet.email();
        const account = { id: faker.datatype.uuid(), email, active: true };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getActiveItemByEmail({ email });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email, active: true });
    });

    it('should get a account by email', async () => {
        const email = faker.internet.email();
        const account = { id: faker.datatype.uuid(), email };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getItemByEmail({ email });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ email });
    });

    it('should get a account by nickname', async () => {
        const nickname = faker.internet.email();
        const account = { id: faker.datatype.uuid(), nickname };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getItemByNickname({ nickname });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({ nickname });
    });

    it('should update active attribute in a account', async () => {
        const id = faker.datatype.uuid();

        const account = { id, active: true };

        const accountRepositoryUpdateSpy = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(account as Account);

        await accountService.updateItemActive({ id });

        expect(accountRepositoryUpdateSpy).toBeCalledTimes(1);
        expect(accountRepositoryUpdateSpy).toHaveBeenCalledWith({ id }, { active: true });
    });

    it('should delete a account', async () => {
        const id = faker.datatype.uuid();

        const account = { id, active: true };

        const accountRepositoryDeleteSpy = jest.spyOn(accountRepository, 'delete').mockResolvedValueOnce(account as Account);

        await accountService.deleteItem({ id });

        expect(accountRepositoryDeleteSpy).toBeCalledTimes(1);
        expect(accountRepositoryDeleteSpy).toHaveBeenCalledWith({ id, active: true });
    });
});
