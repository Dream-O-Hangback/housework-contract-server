import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import Account from '../models/account/entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    create: jest.fn(),
});

describe('AuthController', () => {
    let app: INestApplication;
    let authController: AuthController;
    let authService: AuthService;
    let accountRepository: MockRepository<Account>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                { provide: getRepositoryToken(Account), useValue: mockRepository }
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        authService = moduleRef.get<AuthService>(AuthService);
        authController = moduleRef.get<AuthController>(AuthController);
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