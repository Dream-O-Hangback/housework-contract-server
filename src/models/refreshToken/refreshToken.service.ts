
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
  createItem({ accountId, token, expireDate }) {
    return this.refreshTokenRepository.save({
      accountId,
      token,
      expireDate
    });
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
