import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import failMessage from '@common/constants/failMessage';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'dev' ? false : true,
    exceptionFactory: (errors: never) => {
      throw new HttpException(failMessage.ERR_INVALID_PARAM, HttpStatus.BAD_REQUEST);
    },
  }));
  await app.listen(3000);
}
bootstrap();
