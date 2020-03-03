import {Injectable} from '@nestjs/common';
import neo4j from 'neo4j-driver'

@Injectable()
export class Neo4jService{
    public driver;
    constructor(){
        this.driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'))
    }
    public async getProvider() : Promise<any>{
        return this.driver;
    }
    public async getSesion() : Promise<any>{
        return this.driver.session();
    }
}