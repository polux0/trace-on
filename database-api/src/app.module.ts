import { Module, Inject, Injectable } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j.service';
import { BlockModule } from './block/block.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [BlockModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService, Neo4jService],
})
export class AppModule {}
