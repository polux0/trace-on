import {EMPTY, Observable, from, EmptyError, observable, empty, fromEvent, of, merge} from 'rxjs';
import { mergeMap, map, concatMap } from 'rxjs/operators';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';
import {Transaction} from 'web3-core/types';
import { async } from 'rxjs/internal/scheduler/async';

export class EthereumService  {

constructor(){}

private web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
private subscribtion: any;

private getSubscription(): any{
  return this.web3.eth.subscribe('newBlockHeaders')
}
private async getBlock(blockHeaderNumberOrHash: any) : Promise<any>{
  await this.wait(4000);
  const block = await this.web3.eth.getBlock(blockHeaderNumberOrHash);
  return block;
}
private async getTransactionFromTransactionHash(TransactionHash: any) : Promise<any>{
  const transaction = await this.web3.eth.getTransaction(TransactionHash);
  return transaction;
}
public subscribeToUpcomingBlocks(): Observable<any> {

  const eventEmitter = this.getSubscription();
  const anotherTry = fromEvent(eventEmitter, 'data');
  const $observable = Observable.create(async observer =>{
    eventEmitter.on('data', async blockNumber => observer.next(await this.getBlock(blockNumber.number)));
    eventEmitter.on('error', error => observer.error(error));
  })
  return $observable;
}
public subscribeToUpcomingTransactions() : Observable<any> {

  const blockSubscription = this.subscribeToUpcomingBlocks();
  const blocks = blockSubscription.pipe(mergeMap(block => block.transactions));
  const transactions = blocks.pipe(concatMap(async txHash => await this.getTransactionFromTransactionHash(txHash)))
  blocks.subscribe(async txhash => {
    const b = await this.getTransactionFromTransactionHash(txhash)
    console.log(b)
  })
  return transactions;

}
private wait(ms) {  
  return new Promise(resolve => setTimeout(resolve, ms));
}

}
