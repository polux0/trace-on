import {EMPTY, Observable, EmptyError, observable} from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Server, MessageHandler, CustomTransportStrategy } from '@nestjs/microservices';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';
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
   // web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
    this.subscribtion = this.web3.eth.subscribe('newBlockHeaders', async (error: Error, blockHeader: BlockHeader ) =>{
      if(error){
        console.error('Error: ' + error.message);
        return;
      }
      else{
        console.log('block header: ' + blockHeader.number)

        // Woring example of simple process; BEGIN

        
        // setTimeout(async() => {
        //   const block = await web3.eth.getBlock(blockHeader.number);
        //   const transactionHashes = block.transactions;
        //   const transactions = transactionHashes.map(txHash => web3.eth.getTransaction(txHash))
        //   console.log('actual transactions: ')
        //   const final = Promise.all(transactions)
        //   const another = await final;
        //   console.log(another);
        // }, 3000);

        // Working example of simple process; END

        // Understand how could we implement this via Observers;

        setTimeout(async ()=> {

          const block = await this.web3.eth.getBlock(blockHeader.number)
          const transactions = await this.call('block', block);
          transactions.subscribe(async transactionHash => {
            const a = await this.getTransactionByTransactionHash(transactionHash)
            console.log(a)
          });
          
        }, 4000)
        // Understand how could we implement this via Observers;
      }
    })
  }

  private async getTransactionByTransactionHash(account: string) : Promise<Object>{
      const transaction = await this.web3.eth.getTransaction(account);
      return transaction.value;
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
