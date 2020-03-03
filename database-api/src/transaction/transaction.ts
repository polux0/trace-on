export class Transaction {

    private blockHash: String;
    private transactionIndex: Number;
    private nonce: Number;
    private transactionHash: String;
    private input: String;
    private r: String;
    private s: String;
    private v: String;
    private blockNumber: Number;
    private gas: Number;
    private from: String;
    private to: String;
    private value: String;
    private gasPrice: String;
    constructor(){}

    public getBlockHash(): String{
        return this.blockHash;
    }
    public setBlockHash(blockHash: String): void{
        this.blockHash = blockHash;
    }
    public getTransactionIndex(): Number{
        return this.transactionIndex;
    }
    public setTransactionIndex(transactionIndex: Number): void{
        this.transactionIndex = transactionIndex;
    }
    public getNonce(): Number{
        return this.nonce;
    }
    public setNonce(nonce: Number): void{
        this.nonce = nonce;
    }
    public getTransactionHash(): String{
        return this.transactionHash;
    }
    public setTransactionHash(transactionHash: String): void{
        this.transactionHash = transactionHash;
    }
    public getInput(): String{
        return this.input;
    }
    public setInput(input: String): void{
        this.input = input;
    }
    public getR(): String{
        return this.r;
    }
    public setR(r: String): void{
        this.r = r;
    }
    public getS(): String{
        return this.s;
    }
    public setS(s: String): void{
        this.s = s;
    }
    public getV(): String{
        return this.v;
    }
    public setV(v: String): void{
        this.v = v;
    }
    public getBlockNumber(): Number{
        return this.blockNumber;
    }
    public setBlockNumber(blockNumber: Number): void{
        this.blockNumber = blockNumber;
    }
    public getGas(): Number{
        return this.gas;
    }
    public setGas(gas: Number): void{
        this.gas = gas;
    }
    public getFrom(): String{
        return this.from;
    }
    public setFrom(from: String): void{
        this.from = from;
    }
    public getTo(): String{
        return this.to;
    }
    public setTo(to: String): void{
        this.to = to;
    }
    public getValue(): String{
        return this.value;
    }
    public setValue(value: String): void{
        this.value = value;
    }
    public getGasPrice(): String{
        return this.gasPrice;
    }
    public setGasPrice(gasPrice: String): void{
        this.gasPrice = gasPrice;
    }
}
