import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TickerServer } from './ticker.server';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new TickerServer()
  });
  await app.listen(() => console.debug('Custom microservice created!'));
}
bootstrap();
