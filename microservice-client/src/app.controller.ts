
import { Controller, Get, Inject } from '@nestjs/common';
import {Observable, from, observable} from 'rxjs';
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
     const response = this.client.send<String>('blocks', new String('Requesting blocks...'));
     response.subscribe(console.log)
     return 'Message: `Subscribed to upcoming blocks.`';
  }
  @Get('transactions')
  getTransactions(): string {
    const response = this.client.send<String>('transactions', new String('Requesting transactions...'));
    response.subscribe(console.log)
    return 'Message: `Subscribed to upcoming transactions.`'
  }
  @Get('experimental')
  experimental(): String {
    const response = this.client.send<String>('experimental', new String('Requesting transaction from specific block...'));
    response.subscribe(console.log)
    return 'Message: `Requested transactions from specific block.';
  }
  @Get('experimental/v1')
  experimentalV1(): String {
    const response = this.client.send<String>('experimentalV1', new String('Requesting transaction from specific block...'));
    response.subscribe(console.log)
    return 'Message: `Requested transactions from specific block.';
  }
  // @Get('latest')
  // getLatestBlock(): String {
  //   console.log('this happend');
  //   const response = this.client.send<String>('latest', new String('Requesting latest block...'));
  //   response.subscribe(console.log)
  //   return 'Message: `Request default/latest block.';
  // }
  
}
