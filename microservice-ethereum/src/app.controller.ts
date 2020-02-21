import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Block } from 'web3-eth/types';
import { Observable, from } from 'rxjs';
import { EthereumService } from './ethereum.service';

@Controller()
export class AppController {

  private readonly ethereumService : EthereumService; 
  constructor(){
    this.ethereumService = new EthereumService();
  }
  @MessagePattern('blocks')
  handleLatestBlocks(data: string): any {
    console.log('Subscribed to upcoming blocks...');
    const observer = this.ethereumService.subscribeToUpcomingBlocks();
    return observer;
  }
  @MessagePattern('transactions')
  handleLatestTransactions(data: string): any{
    console.log('Subscribed to upcoming transactions...')
    const observer = this.ethereumService.subscribeToUpcomingTransactions();
  }

}
