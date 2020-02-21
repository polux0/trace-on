import {EMPTY, Observable, from, EmptyError, observable, empty} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { Server, MessageHandler, CustomTransportStrategy } from '@nestjs/microservices';
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
private async getBlock(blockHeaderNumberOrHash: string) : Promise<any>{
  await this.wait(4000);
  const block = await this.web3.eth.getBlock(blockHeaderNumberOrHash);
  return block;
}
private async getTransactionFromTransactionHash(TransactionHash: string) : Promise<any>{
  return await this.web3.eth.getTransaction(TransactionHash);
}
public subscribeToUpcomingBlocks(): Observable<Block> {
  const eventEmitter = this.getSubscription();
  const $observable = Observable.create(async observer =>{
    eventEmitter.on('data', async blockNumber => observer.next(await this.getBlock(blockNumber.number)));
    eventEmitter.on('error', error => observer.error(error));
  })
  return $observable;
}
public subscribeToUpcomingTransactions() : void {
  const blocks = this.subscribeToUpcomingBlocks();
  const transactions = blocks.pipe(map(block => block.transactions))
  transactions.subscribe(async transaction => {
    console.log('singular transaction transaction hash:', transaction);
  })
  //return;
}
private wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

}
