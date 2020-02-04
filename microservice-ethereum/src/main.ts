import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EthereumServer } from './ethereum.server';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new EthereumServer()
  });
  await app.listen(() => console.log('First microservice I have ever deployed is listening'));

}
bootstrap();
