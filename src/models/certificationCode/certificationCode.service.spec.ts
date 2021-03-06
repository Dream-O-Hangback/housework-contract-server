import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, MoreThan, Repository } from 'typeorm';
import * as faker from 'faker';
import MockDate from 'mockdate';
import * as keyGenerator from '@common/lib/keyGenerator';
import { CertificationCodeService } from './certificationCode.service';
import CertificationCode from './entities';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const executeSpy = jest.fn().mockReturnValue(new InsertResult());

const mockRepository = jest.fn(() => ({
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        orUpdate: jest.fn().mockReturnThis(),
        execute: executeSpy,
    })),
}));


describe('CertificationCodeService', () => {
    let certificationCodeService: CertificationCodeService;
    let certificationCodeRepository: MockRepository<CertificationCode>;

    beforeAll(() => MockDate.set('2021-01-01'));

    afterAll(() => MockDate.reset());

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CertificationCodeService,
                { provide: getRepositoryToken(CertificationCode), useValue: mockRepository() },
            ],
        }).compile();

        certificationCodeService = moduleRef.get<CertificationCodeService>(CertificationCodeService);
        certificationCodeRepository = moduleRef.get(getRepositoryToken(CertificationCode));
    });

    it('should get a certification code', async () => {
        const codeData = {
            email: faker.internet.email(),
            code: keyGenerator.keyGenerator(),
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

        const resultCertificationCode = await certificationCodeService.getItem({ email, code });

        expect(resultCertificationCode).toBe(certificationCode as CertificationCode);
        expect(certificationCodeRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositoryFindOneSpy).toHaveBeenCalledWith({
            email,
            code,
            expireDate: MoreThan(new Date()),
        });
    });

    it('should get a certification code by account id', async () => {
        const accountId = faker.datatype.uuid();

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const certificationCode = {
            email: faker.internet.email(),
            code: keyGenerator.keyGenerator(),
            accountId,
            expireDate,
        };

        const certificationCodeRepositoryFindOneSpy = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(certificationCode as CertificationCode);

        const resultCertificationCode = await certificationCodeService.getItemByAccountId({ accountId });

        expect(resultCertificationCode).toBe(certificationCode as CertificationCode);
        expect(certificationCodeRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositoryFindOneSpy).toHaveBeenCalledWith({ accountId });
    });

    it('should upsert a certification code', async () => {
        const accountId = faker.datatype.uuid();
        const email = faker.internet.email();

        const code = keyGenerator.keyGenerator();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const keyGeneratorSpy = jest.spyOn(keyGenerator, 'keyGenerator').mockReturnValue(code);

        const resultCertificationCode = await certificationCodeService.upsertItem({ accountId, email });

        expect(keyGeneratorSpy).toBeCalledTimes(1);
        expect(resultCertificationCode).toStrictEqual(new InsertResult());
        expect(executeSpy).toBeCalledTimes(1);
    });
});