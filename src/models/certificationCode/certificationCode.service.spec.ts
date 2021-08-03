import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as faker from 'faker';
import MockDate from 'mockdate';
import { CertificationCodeService } from './certificationCode.service';
import CertificationCode from './entities';
import * as lib from '@common/lib';
import { keyGenerator } from '@common/lib';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    save: jest.fn(),
    findOne: jest.fn(),
});

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
            code: keyGenerator(),
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

    it('should upsert a certification code', async () => {
        const accountId = faker.datatype.uuid();
        const email = faker.internet.email();

        const code = keyGenerator();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const certificationCode = {
            accountId,
            email,
            code,
            expireDate,
        };

        const keyGeneratorSpy = jest.spyOn(lib, 'keyGenerator').mockReturnValue(code);
        const certificationCodeRepositoryFindOneSpy = jest.spyOn(certificationCodeRepository, 'findOne').mockResolvedValueOnce(undefined);
        const certificationCodeRepositorySaveSpy = jest.spyOn(certificationCodeRepository, 'save').mockResolvedValueOnce(certificationCode);

        const resultCertificationCode = await certificationCodeService.upsertItem({ accountId, email });

        expect(keyGeneratorSpy).toBeCalledTimes(1);
        expect(resultCertificationCode).toBe(certificationCode as CertificationCode);
        expect(certificationCodeRepositoryFindOneSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositoryFindOneSpy).toHaveBeenCalledWith({ email });
        expect(certificationCodeRepositorySaveSpy).toBeCalledTimes(1);
        expect(certificationCodeRepositorySaveSpy).toHaveBeenCalledWith(certificationCode);
    });
});