import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickerServer } from './ticker.server';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TickerServer],
})
export class AppModule {}
