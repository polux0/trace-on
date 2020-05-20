import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {

  // kafka to be introduced
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers:['kafka']
    }
  }
  });
  // testing if docker is set up right
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   options: {host: 'microservice-ethereum', port: 4000}
  // });
  await app.listen(() => console.log('Ethereum microservice is deployed and is listening'));

}
bootstrap();