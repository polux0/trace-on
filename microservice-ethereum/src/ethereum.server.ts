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
    callback();
  }
  private subscribtion: any;

  
  private listenToBlocks(): void {
    const web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
    this.subscribtion = web3.eth.subscribe('newBlockHeaders', (error: Error, blockHeader: BlockHeader ) =>{
      if(error){
        console.error('Error: ' + error.message);
        return;
      }
      else{
        console.log('seems like everything is all right;')
        console.log('block header: ' + blockHeader.number)
        web3.eth.getBlock(blockHeader.number).then(async(block:Block) =>{
          console.log('transactions: ' + block)
          return this.call('block', block).then(observable => {
            observable.subscribe(console.log);
          })
        })
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
