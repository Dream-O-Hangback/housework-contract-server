import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import MockDate from 'mockdate';
import Account from '@models/account/entities';
import { WithdrawService } from './withdraw.service';
import Withdraw from './entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    save: jest.fn(),
});

describe('WithdrawService', () => {
    let withdrawService: WithdrawService;
    let withdrawRepository: MockRepository<Withdraw>;

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                WithdrawService,
                { provide: getRepositoryToken(Withdraw), useValue: mockRepository() },
            ],
        }).compile();

        withdrawService = moduleRef.get<WithdrawService>(WithdrawService);
        withdrawRepository = moduleRef.get(getRepositoryToken(Withdraw));
    });

    it('should create a new withdraw', async () => {
        const account = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: faker.random.word(),
            name: faker.random.word(),
            nickname: faker.random.word(),
            profileImageUrl: faker.internet.url(),
            profile: faker.random.word(),
            type: faker.random.word(),
            notificationOpen: false,
            notificationOpenDate: new Date(),
            emailOpen: false,
            emailOpenDate: new Date(),
            lastUpdateDate: new Date(),
            lastUpdateIp: faker.internet.ip(),
            createDate: new Date(),
            active: true,
        };

        const withdrawRepositorySaveSpy = jest.spyOn(withdrawRepository, 'save').mockResolvedValueOnce({ ...account, deleteDate: new Date() });
        const result = await withdrawService.createItem(account as Account);

        expect(result).toStrictEqual({ ...account, deleteDate: new Date() });
        expect(withdrawRepositorySaveSpy).toBeCalledTimes(1);
        expect(withdrawRepositorySaveSpy).toHaveBeenCalledWith(expect.objectContaining(account));
    });
});
