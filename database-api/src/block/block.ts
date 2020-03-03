export class Block {

    private logsBloom: String;
    private totalDifficulty: String;
    private extraData: String;
    private transactions: Array<any>;
    private nonce: String;
    private miner: String;
    private difficulty: String;
    private number: Number;
    private gasLimit: String;
    private gasUsed: String;
    private uncles: String;
    private size: String;
    private sha3Uncles: Array<String>;
    private transactionsRoot: String;
    private stateRoot: String;
    private parentHash: String;
    private hash: String;
    private timestamp: Date;

    constructor() { }

    public getLogsBloom(): String{
        return this.logsBloom;
    }
    public setLogsBloom(logsBloom: String): void {
        this.logsBloom = logsBloom;
    
    }
    public getTotalDifficulty(): String{
        return this.totalDifficulty;
    }
    public setTotalDifficulty(totalDifficulty: String): void {
        this.totalDifficulty = totalDifficulty;
    }
    public getExtraData(extraData: String): String{
        return this.extraData;
    }
    public setExtraData(extraData: String): void {
        this.extraData = extraData;
    }
    public getTransactions(): Array<any>{
        return this.transactions;
    }
    public setTransactions(transactions: Array<any>): void {
        this.transactions = transactions;
    }
    public getNonce(): String{
        return this.nonce;
    }
    public setNonce(nonce: String): void {
        this.nonce = nonce;
    }
    public getMiner(): String{
        return this.miner;
    }
    public setMiner(miner: String): void {
        this.miner = miner;
    }
    public getDifficulty(): String{
        return this.difficulty;
    }
    public setDifficulty(difficulty: String): void {
        this.difficulty = difficulty;
    }
    public getNumber(): Number{
        return this.number;
    }
    public setNumber(number: Number): void {
        this.number = number;
    }
    public getGasLimit(): String{
        return this.gasLimit;
    }
    public setGasLimit(gasLimit: String): void {
        this.gasLimit = gasLimit;
    }
    public getGasUsed(): String{
        return this.gasUsed;
    }
    public setGasUsed(gasUsed: String): void {
        this.gasUsed = gasUsed;
    }
    public getUncles(): String{
        return this.uncles;
    }
    public setUncles(uncles: String): void {
        this.uncles = uncles;
    }
    public getSize(): String{
        return this.size;
    }
    public setSize(size: String): void {
        this.size = size;
    }
    public getSha3Uncles(): Array<String>{
        return this.sha3Uncles;
    }
    public setSha3Uncles(sha3Uncles: Array<String>): void {
        this.sha3Uncles = sha3Uncles;
    }
    public getTransactionsRoot(): String{
        return this.transactionsRoot;
    }
    public setTransactionsRoot(transactionsRoot: String): void {
        this.transactionsRoot = transactionsRoot;
    }
    public getStateRoot(): String{
        return this.stateRoot;
    }
    public setStateRoot(stateRoot: String): void {
        this.stateRoot = stateRoot;
    }
    public getParentHash(): String{
        return this.parentHash;
    }
    public setParentHash(parentHash: String): void {
        this.parentHash = parentHash;
    }
    public getHash(): String{
        return this.hash;
    }
    public setHash(hash: String): void {
        this.hash = hash;
    }
    public getTimestamp(): Date{
        return this.timestamp;
    }
    public setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }

    
}
