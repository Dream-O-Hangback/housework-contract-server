import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { MulterModule } from '@nestjs/platform-express/multer';
import * as multer from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './models/account/account.module';
import { DefaultModule } from './models/default/default.module';
import entities from './models';

@Module({
    imports: [
            ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
            }),
            TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities,
            synchronize: true,
            }),
            MailerModule.forRoot({
            transport: {
                host :'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@housework-contract.com>',
            },
            }),
            MulterModule.register({
                dest: `${__dirname}/image/`,
                storage: multer.diskStorage({
                    filename: (req, _file, cb) => {
                        cb(null, `${req.user.id}_${Date.now()}`)
                    },
                    destination: (req: any, file: any, cb: any) => {
                        // const uploadPath = multerConfig.dest;
                        // // Create folder if doesn't exist
                        // if (!existsSync(uploadPath)) {
                        //     mkdirSync(uploadPath);
                        // }
                        cb(null, `${__dirname}/image/`);
                    },
                }),
            }),
            AuthModule,
            AccountModule,
            DefaultModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
