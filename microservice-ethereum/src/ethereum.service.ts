import {EMPTY, Observable, from, EmptyError, observable, empty, fromEvent, of, merge, forkJoin, concat, zip} from 'rxjs';
import { mergeMap, concatMap, filter, concatAll, toArray, combineAll, map, take } from 'rxjs/operators';
import Web3 from 'web3';
import { Block, BlockHeader } from 'web3-eth/types';
import {Transaction} from 'web3-core/types';
import { async } from 'rxjs/internal/scheduler/async';
import { fork } from 'child_process';
import { isNullOrUndefined } from 'util';

export class EthereumService  {

constructor(){}

private web3: Web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/649a556ac8104fe48085c9a1b63a15e3'));
private subscribtion: any;

private getSubscription(): any{
  return this.web3.eth.subscribe('newBlockHeaders')
}
private async getBlock(blockHeaderNumberOrHash: any) : Promise<any>{
  await this.wait(4700);
  const block = await this.web3.eth.getBlock(blockHeaderNumberOrHash);
  return block;
}
private async getTransactionFromTransactionHash(TransactionHash: any) : Promise<any>{
  const transaction = await this.web3.eth.getTransaction(TransactionHash);
  return transaction;
}
private async getTransactionsFromBlock(blockNumber: number): Promise<any>{
  const block = await this.web3.eth.getBlock(blockNumber);
  const transactionHashes = block.transactions;
  const transactions = transactionHashes.map(async txHash => await this.getTransactionFromTransactionHash(txHash));
  const transactionsResolved = await Promise.all(transactions);
  return transactionsResolved;
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
  return transactions;
}
public async getCurrentBlock(): Promise<Observable<any>>{
  const currentBlock = await this.web3.eth.getBlockNumber();
  console.log(currentBlock);
  return of(currentBlock);
}
// working version; Begin;
// public async experimental(blockNumberFrom: any, address: String): Promise<Observable<any>>{
//   const startTime = Date.now();
//   console.log(startTime)
//   const observables: Array<Observable<any>> = [];
//   const blockNumberTo = await this.web3.eth.getBlockNumber();
//   const anotherApproach = Observable.create(async observer => {})
//   for(blockNumberFrom; blockNumberFrom < 9767569; blockNumberFrom++){
//     const block = await this.getBlock(blockNumberFrom);
//     const transactionHashes = of(block).pipe(mergeMap(block => block.transactions));
//     const transactions = transactionHashes.pipe(concatMap(async txHash => await this.getTransactionFromTransactionHash(txHash)));
//     const filteredTransactions = concat(transactions.pipe(filter(transaction => transaction.from == address || transaction.to == address)))
//     filteredTransactions.subscribe(console.log)
//     observables.push(filteredTransactions);
//   }

//   console.log(Date.now() - startTime)
//   return concat(...observables);
// }

// public async experimentalV1(blockNumberFrom: any, address: String): Promise<Observable<any>>{
//   const startTime = Date.now();
//   const observable$: any = []
//   const blockNumberTo = await this.web3.eth.getBlockNumber();
//   for(blockNumberFrom; blockNumberFrom < 9767569; blockNumberFrom++){
//     const block = await this.web3.eth.getBlock(blockNumberFrom);
//     const transactionHashes = block.transactions;
//     const transactions = transactionHashes.map(async txHash => await this.getTransactionFromTransactionHash(txHash));
//     const transactionsResolved = await Promise.all(transactions);
//     const transactionsFiltered = transactionsResolved.filter(transaction => transaction.to == address || transaction.from == address);
//     const transactionsFiltered$ = from(transactionsFiltered);
//     transactionsFiltered$.subscribe(console.log)
//     console.log(transactionsFiltered$);
//     observable$.push(transactionsFiltered);
//     console.log('end')
//     console.log(Date.now() - startTime) // 47941
//   }
//   return of(observable$);
// }
// working version; End;
public experimental: Function = async function experimental(blockNumberFrom: any, blockNumberTo: any, address: String): Promise<Observable<any>>{

  const to: Number = blockNumberTo === isNullOrUndefined ? await this.web3.eth.getBlockNumber() : blockNumberTo; 
  const fromToBlockNumberToLatest: any = this.subscribeToUpcomingTransactions(); 
  const observable$: Observable<Transaction> = Observable.create(async observer => {
  for(blockNumberFrom; blockNumberFrom < 9767569; blockNumberFrom++){
    const block = await this.getBlock(blockNumberFrom);
    const transactionHashes = of(block).pipe(mergeMap(block => block.transactions));
    const transactions = transactionHashes.pipe(concatMap(async txHash => await this.getTransactionFromTransactionHash(txHash)));
    const filteredTransactions = concat(transactions.pipe(filter(transaction => transaction.from == address || transaction.to == address)))
    filteredTransactions.subscribe(value => {
      //console.log(value);
      observer.next(value)
    });
  }
  observer.next('---------------------------------------------------------___________!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1-end between requested and upcoming');
  fromToBlockNumberToLatest.subscribe(value => observer.next(value));

  })

  return observable$;
}
public async experimentalV1(blockNumberFrom: any, blockNumberTo: any, address: String): Promise<Observable<any>>{
  // actually is good -> observer just start emitting when it's called; we need it to work in background and store immediately; 
  const currentBlock = await this.web3.eth.getBlockNumber();
  console.log('block number at the start of execution: ' + currentBlock);
  const currentBlockTransactions = await this.getTransactionsFromBlock(currentBlock);
  const fromToBlockNumberToLatest: Observable<Transaction> = this.subscribeToUpcomingTransactions();
  fromToBlockNumberToLatest.subscribe(console.log)
  const to: Number = blockNumberTo === isNullOrUndefined ? await this.web3.eth.getBlockNumber() : blockNumberTo;  
  const observable$ = Observable.create(async observer => {
  for(blockNumberFrom; blockNumberFrom < 9767569; blockNumberFrom++){
    const transactionsResolved = await this.getTransactionsFromBlock(blockNumberFrom);
    const transactionsFiltered = transactionsResolved.filter(transaction => transaction.to == address || transaction.from == address);
    const transactionsFiltered$ = from(transactionsFiltered);
    transactionsFiltered$.subscribe(value => {
      observer.next(value);
    })
    // fromToBlockNumberToLatestFiltered.subscribe(transaction => {
    //   console.log(transaction);
    //   observer.next(transaction);
    // }) 9821092 
  }
  observer.next('-----------------------------------------------end between requested: current is next;');
  const currentBlockTransactions$ = from(currentBlockTransactions);
  currentBlockTransactions$.subscribe(transaction => {
    //console.log(transaction);
    observer.next(transaction)
  })
  observer.next('------------------------------------------------end between requested and current: upcoming are next;');
  const fromToBlockNumberToLatestFiltered = fromToBlockNumberToLatest.pipe(filter(transaction => transaction.from == address || transaction.to == address));
  fromToBlockNumberToLatest.pipe(take(3)).subscribe(transaction => {
    console.log(transaction.blockNumber);
    observer.next(transaction);
  })

  })
  return observable$;
}
private wait(ms) {  
  return new Promise(resolve => setTimeout(resolve, ms));
}

}
