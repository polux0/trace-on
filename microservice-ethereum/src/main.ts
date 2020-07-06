import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers:['trace-on_kafka_1:9092']
    }
  }
  });
  await app.listen(() => console.log('Ethereum microservice is deployed and is listening'));

}
bootstrap();