import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices'


@Module({

  imports: [
    ClientsModule.register([
      {
        name: 'ECHO_SERVICE', 
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ethereum-client',
            brokers: ['trace-on_kafka_1:9092']
          },
          consumer: {
            groupId: 'ethereum-client-consumer'
          }
        }
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
