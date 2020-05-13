import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices'


@Module({

  imports: [
    ClientsModule.register([{name: 'ECHO_SERVICE', transport: Transport.TCP, options:{host:'microservice-ethereum', port: 4000}}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
