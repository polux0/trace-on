import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {host: 'localhost', port: 4000}
  });
  await app.listen(() => console.log('Ethereum microservice is deployed and is listening'));

}
bootstrap();