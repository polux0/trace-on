import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EthereumServer } from './ethereum.server';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new EthereumServer(),
    options: {host: 'localhost', port: 3002}
  });
  await app.listen(() => console.log('First microservice I have ever deployed is listening'));

}
bootstrap();
