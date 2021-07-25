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
        
        console.log(req.headers, this.configService.get<string>('ADMIN_API_KEY'));
        if (req.headers['x-api-key'] === this.configService.get<string>('ADMIN_API_KEY')) {
            console.log('yes!');
            return true;
        }

        throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
    }
}