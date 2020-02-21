
import { Controller, Get, Inject } from '@nestjs/common';
import {Observable, from, observable} from 'rxjs';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(@Inject('ECHO_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap(){
    try {
      await this.client.connect();
    } 
    catch (error) {
      console.log('Error occured during connection: ', error);
    }
    
  }
  @Get('blocks')
  getBlocks(): string {
     const response = this.client.send<any>('blocks', new String('Requesting blocks...'));
     response.subscribe(console.log)
     return 'Message: `Subscribed to upcoming blocks.`';
  }
  @Get('transactions')
  getTransactions(): string {
    const response = this.client.send<any>('transactions', new String('Requesting transactions...'));
    response.subscribe(console.log)
    return 'Message: `Subscribed to upcoming transactions.`'
  }
  
}
