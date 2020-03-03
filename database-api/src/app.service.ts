import { Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { session } from 'neo4j-driver';

@Injectable()
export class AppService {
  constructor(private readonly neo4j: Neo4jService){}

  async findAll(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('MATCH (n) RETURN n;');
  }
  async createTransaction(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')
  }
  async createBlock(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')
  }
  async getBlock(blockNumber: Number): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')
  }
  async getTransactions(blockNumber: Number): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')    
  }
}
