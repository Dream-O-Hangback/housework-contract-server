import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'dev' ? false : true,
    exceptionFactory: (errors: never) => {
      throw new HttpException({
        message: 'fail',
        errorCode: 'ERR_INVALID_PARAM',
        description: '...'
      }, HttpStatus.BAD_REQUEST);
    },
  }));
  await app.listen(3000);
}
bootstrap();
