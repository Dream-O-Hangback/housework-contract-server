
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RefreshToken from './entities';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    this.refreshTokenRepository = refreshTokenRepository;
  }
  async upsertItem({ accountId, token, expireDate }) {
    return this.refreshTokenRepository
      .createQueryBuilder()
      .insert()
      .values({
        accountId,
        token,
        expireDate
      })
      .orUpdate({ conflict_target: ['account_id'], overwrite: ['token', 'expire_date'] })
      .execute();
  }
  getItem({ accountId }) {
    return this.refreshTokenRepository.findOne({ accountId }, { select: ['token', 'expireDate'] });
  }
  updateItem({ accountId, newToken, expireDate }) {
    return this.refreshTokenRepository.update({ accountId }, { token: newToken, expireDate });
  }
  deleteItem({ accountId }) {
    return this.refreshTokenRepository.delete({ accountId });
  }
}
