import { Module, Inject, Injectable } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Neo4jService],
})
export class AppModule {}
