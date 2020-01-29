import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    //options: { host: 'localhost', port: 3002 }
  });
  await app.listen(() => console.log('First microservice I have ever deployed is listening'));
}
bootstrap();
