import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from '../account/entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    create: jest.fn(),
});

describe('AccountController', () => {
    let app: INestApplication;
    let accountController: AccountController;
    let accountService: AccountService;
    let accountRepository: MockRepository<Account>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [
                AccountService,
                { provide: getRepositoryToken(Account), useValue: mockRepository }
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        accountService = moduleRef.get<AccountService>(AccountService);
        accountController = moduleRef.get<AccountController>(AccountController);
        accountRepository = moduleRef.get(getRepositoryToken(Account));
    });

    describe('signUp', () => {
        it('should create a new account', async () => {
            // const currentDate = new Date()
            // const obj = {
            //     "email": "kyw017763@gmail.com",
            //     "name": "A",
            //     "nickname": "A",
            //     "profileImageUrl": "",
            //     "profile": "A",
            //     "notificationOpen": true,
            //     "notificationOpenDate": currentDate,
            //     "emailOpen": true,
            //     "emailOpenDate": currentDate,
            //     "lastUpdateDate": currentDate,
            //     "createDate": currentDate
            // };

            // jest.spyOn(authService, 'create').mockImplementation(() => obj as Account);
            // jest.spyOn(authService, 'save').mockImplementation(async () => result);

            // const result = authService.create(obj as Account);

            // expect(await authService.create({
            //     "email": "string",
            //     "password": "string",
            //     "name": "string",
            //     "nickname": "string",
            //     "profile": "string",
            //     "type": "string",
            //     "notificationOpen": true,
            //     "emailOpen": true
            // } as Account)).toBe(result);
        });
    });
});