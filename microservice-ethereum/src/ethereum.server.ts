import {EMPTY, Observable, from, EmptyError, observable, empty} from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Server, MessageHandler, CustomTransportStrategy } from '@nestjs/microservices';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';
import {Transaction} from 'web3-core/types';
import { async } from 'rxjs/internal/scheduler/async';

export class EthereumServer extends Server implements CustomTransportStrategy {

  constructor(){
    super();
  }
  public listen(callback: () => void) {
    this.listenToBlocks();
    //callback();
  }
  private web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
  private subscribtion: any;

  
  private listenToBlocks(): void {
    this.subscribtion = this.web3.eth.subscribe('newBlockHeaders', async (error: Error, blockHeader: BlockHeader ) =>{
      if(error){
        console.error('Error: ' + error.message);
        return;
      }
      else{
        console.log('block header: ' + blockHeader.number)

        setTimeout(async ()=> {

          const block = await this.web3.eth.getBlock(blockHeader.number)
          const transactions = await this.call('block', block);

          transactions.subscribe(async transactionHash => {
            const a = await this.getTransactionByTransactionHash(transactionHash)
            a.subscribe(
              transaction =>
            {
              console.log('from: ', transaction.from)
              console.log('to: ', transaction.to)
              console.log('value: ', transaction.value)
            }, error =>
            {
              console.log('transaction must be undefined or null', error)
            }
            )
          }, error =>{
            console.log('error happend in a subscribe method; ', error)
          });
          
        }, 4000)
        // Understand how could we implement this via Observers;
      }
    })
  }

  private async getTransactionByTransactionHash(account: string) : Promise<Observable<any>>{
      const transaction = await this.web3.eth.getTransaction(account);
      //return from(Promise.resolve(EMPTY))
      return from(Promise.resolve(transaction));
  }

  private async call(pattern: string, data: Block): Promise<Observable<any>>{
    const handler: MessageHandler | undefined = this.messageHandlers.get(pattern);
    if(!handler){
      return Promise.resolve(EMPTY);
    }
    return handler(data);

  }
  public close() {
    this.subscribtion.unsubscribe();
  }

}
