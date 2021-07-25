import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { AccountService } from './account.service';
import Account from './entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    save: jest.fn(),
    findAndCount: jest.fn(),
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
        const hashedPassword = await bcrypt.hash(originalPassword, (await bcrypt.genSalt()));

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

    it('should get (active) account list by search word', async () => {
        const searchWord = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const offset = 0;
        const limit = 10;

        const accounts = [
            {
                id: faker.datatype.uuid(),
                email: faker.internet.email(),
                name: searchWord,
                nickname: searchWord,
                profile: faker.random.word(),
            },
            {
                id: faker.datatype.uuid(),
                email: faker.internet.email(),
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
                profile: faker.random.word(),
            },
            {
                id: faker.datatype.uuid(),
                email: faker.internet.email(),
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
                profile: faker.random.word(),
            },
        ];

        const filteredAccounts = accounts.filter((elem) => (
            elem.email.indexOf(searchWord) !== -1 ||
            elem.name.indexOf(searchWord) !== -1 ||
            elem.nickname.indexOf(searchWord) !== -1
        ));

        const accountRepositoryFindSpy = jest.spyOn(accountRepository, 'findAndCount').mockResolvedValueOnce([filteredAccounts, filteredAccounts.length]);
        
        const { list, count } = await accountService.getList({ searchWord, skip: offset * limit, take: limit });
        
        expect(list).toHaveLength(1);
        expect(list[0]).toStrictEqual(accounts[0]);
        expect(count).toEqual(1);
        expect(accountRepositoryFindSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindSpy).toHaveBeenCalledWith({
            where: [
                { email: Like(`%${searchWord}%`), active: true },
                { name: Like(`%${searchWord}%`), active: true },
                { nickname: Like(`%${searchWord}%`), active: true },
            ],
            select: ['id', 'email', 'name', 'nickname', 'profileImageUrl', 'profile'],
            skip: offset * limit,
            take: limit,
        });
    });

    it('should get a active account', async () => {
        const id = faker.datatype.uuid();
        const account = { id, active: true };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getActiveItem({ id });
        
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

    it('should get a active account info', async () => {
        const id = faker.datatype.uuid();
        const account = {
            id,
            email: faker.internet.email(),
            name: faker.random.word(),
            nickname: faker.random.word(),
            profileImageUrl: null,
            profile: faker.random.word(),
            type: 'local',
            notificationOpen: true,
            notificationOpenDate: new Date(),
            emailOpen: true,
            emailOpenDate: new Date(),
            createDate: new Date(),
        };

        const accountRepositoryFindOneSpy = jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(account as Account);
        
        const result = await accountService.getInfo({ id });
        
        expect(result).toBe(account as Account);
        expect(accountRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith(
            { id, active: true },
            { select: ['id', 'email', 'name', 'nickname', 'profileImageUrl', 'profile', 'type', 'notificationOpen', 'notificationOpenDate', 'emailOpen', 'emailOpenDate', 'createDate'] },
        );
    });

    it('should update active attribute in a account', async () => {
        const id = faker.datatype.uuid();

        const accountRepositoryUpdateSpy = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(new UpdateResult());

        const result = await accountService.updateItemActive({ id });

        expect(result).toBeInstanceOf(UpdateResult);
        expect(accountRepositoryUpdateSpy).toBeCalledTimes(1);
        expect(accountRepositoryUpdateSpy).toHaveBeenCalledWith({ id }, { active: true });
    });

    it('should update nickname attribute in a account', async () => {
        const id = faker.datatype.uuid();
        const nickname = faker.random.word();

        const accountRepositoryUpdateSpy = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(new UpdateResult());

        const result = await accountService.updateItemNickname({ id, nickname });

        expect(result).toBeInstanceOf(UpdateResult);
        expect(accountRepositoryUpdateSpy).toBeCalledTimes(1);
        expect(accountRepositoryUpdateSpy).toHaveBeenCalledWith({ id }, { nickname });
    });

    it('should update profile attribute in a account', async () => {
        const id = faker.datatype.uuid();
        const profile = faker.random.word();

        const accountRepositoryUpdateSpy = jest.spyOn(accountRepository, 'update').mockResolvedValueOnce(new UpdateResult());

        const result = await accountService.updateItemProfile({ id, profile });

        expect(result).toBeInstanceOf(UpdateResult);
        expect(accountRepositoryUpdateSpy).toBeCalledTimes(1);
        expect(accountRepositoryUpdateSpy).toHaveBeenCalledWith({ id }, { profile });
    });

    it('should delete a account', async () => {
        const id = faker.datatype.uuid();

        const accountRepositoryDeleteSpy = jest.spyOn(accountRepository, 'delete').mockResolvedValueOnce(undefined);

        await accountService.deleteItem({ id });

        expect(accountRepositoryDeleteSpy).toBeCalledTimes(1);
        expect(accountRepositoryDeleteSpy).toHaveBeenCalledWith({ id, active: true });
    });
});
