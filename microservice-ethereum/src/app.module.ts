import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EthereumServer } from './ethereum.server';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EthereumServer],
})
export class AppModule {}
