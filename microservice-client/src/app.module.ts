import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices'


@Module({

  imports: [
    ClientsModule.register([
      {
        name: 'ECHO_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'requestTransactions',
          queueOptions: {
            durable: true
            },
          },
        },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
