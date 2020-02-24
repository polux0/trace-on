import { Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Injectable()
export class AppService {
  constructor(private readonly neo4j: Neo4jService){}
  async findAll(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('MATCH (n: Movie) RETURN n limit 5;');
  }
}
