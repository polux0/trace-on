import {EMPTY, Observable, observable} from "rxjs";
import { Injectable } from '@nestjs/common';
import { MessageHandler, Server } from '@nestjs/microservices';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';
import { CustomTransportStrategy } from "@nestjs/common/interfaces/microservices/custom-transport-strategy.interface";

@Injectable()
export class AppService extends Server implements CustomTransportStrategy {

  public listen(callback: () => void) {
    this.listenToBlocks();
    callback();
  }
  private subscribtion: any;

  
  private listenToBlocks(): void {
    const web3: Web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/v3/649a556ac8104fe48085c9a1b63a15e3"));
    this.subscribtion = web3.eth.subscribe('newBlockHeaders', (error: Error, blockHeader: BlockHeader ) =>{
      if(error){
        console.log('Error has occured');
        return;
      }
      else{
        web3.eth.getBlock(blockHeader.number).then(async(block:Block) =>{
          return this.call("Block", block).then(observable => {
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
