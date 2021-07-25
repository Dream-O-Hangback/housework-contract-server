import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
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
    AuthModule,
    AccountModule,
    DefaultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
