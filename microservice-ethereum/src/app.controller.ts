import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Block } from 'web3-eth/types';
import { Observable, from, observable } from 'rxjs';
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
    const observable = this.ethereumService.subscribeToUpcomingBlocks();
    return observable;
  }
  @MessagePattern('transactions')
  handleLatestTransactions(data: string): any{
    console.log('Subscribed to upcoming transactions...')
    const observable = this.ethereumService.subscribeToUpcomingTransactions();
    return observable;
  }
  @MessagePattern('experimental')
  experimental(data: string): any {
    console.log('Requested default / hopefully latest block...')
    const observable$ = this.ethereumService.experimental(9767556, new String('0x0767B75c95653D8BA2ab318dcC63CaC7Ff3e6016'));
    //const observable$ = this.ethereumService.bla();
    return observable$;
  }
  @MessagePattern('experimentalV1')
  experimentalV1(data: string): any {
    console.log('Requested default / hopefully latest block...')
    const observable$ = this.ethereumService.experimentalV1(9767556, new String('0x0767B75c95653D8BA2ab318dcC63CaC7Ff3e6016'));
    return observable$;
  }
  // @MessagePattern('latest')
  // getLatestBLock(data: string): any {
  //   console.log('Requested default / hopefully latest block...')
  //   const observable = this.ethereumService.getTransactionsFromBlock();
  //   return observable;
  // }

}