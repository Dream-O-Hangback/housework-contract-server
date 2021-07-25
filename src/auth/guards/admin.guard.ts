import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {
        this.configService = configService;
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        
        if (req.headers['x-api-key'] === this.configService.get<string>('ADMIN_API_KEY')) {
            return true;
        }

        throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
    }
}