import {EMPTY, Observable} from 'rxjs';
import { Injectable } from '@nestjs/common';
import { Server, MessageHandler, CustomTransportStrategy } from '@nestjs/microservices';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';

export class EthereumServer extends Server implements CustomTransportStrategy {

  constructor(){
    super();
  }
  public listen(callback: () => void) {
    this.listenToBlocks();
    //callback();
  }
  private subscribtion: any;

  
  private listenToBlocks(): void {
    const web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
    this.subscribtion = web3.eth.subscribe('newBlockHeaders', async (error: Error, blockHeader: BlockHeader ) =>{
      if(error){
        console.error('Error: ' + error.message);
        return;
      }
      else{
        console.log('seems like everything is all right;')
        console.log('block header: ' + blockHeader.number)

        setTimeout(async() => {
          const block = await web3.eth.getBlock(blockHeader.number);
          const transactionHashes = block.transactions;
          const transactions = transactionHashes.map(txHash => web3.eth.getTransaction(txHash))
          console.log('actual transactions: ')
          const final = Promise.all(transactions)
          const another = await final;
          console.log(another);
        }, 3000);
        
        
        // const transactions = transactionHashes.map(async txHash => { const actualTransactions = await web3.eth.getTransaction(txHash)
        //   return actualTransactions;
        // })

        //console.log('actual transactions: ' + transactionHashes);
        //const transactions = setTimeout(()=> web3.eth.getBlock(blockHeader.number).then(data => {
          //console.log (data.transactions)
          //return data.transactions;
       // }), 3500)
        //console.log('transactions from newly created block: ' + transactions);
        //const transactionHashes = transactions.map(transaction => transactions)
        


        //block.then(data => console.log('block: ' + data))
        //web3.eth.getBlock(blockHeader.number).then(async(block:Block) =>{
          //console.log('transactions: ' + block.transactionRoot)
          // return this.call('block', block).then(observable => {
          //   observable.subscribe(console.log);
          // })
        //})
      }
    })
  }
  private call(pattern: string, data: Block): Promise<Observable<any>>{

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
