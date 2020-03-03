import { Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Block } from './block/block';

@Injectable()
export class AppService {
  constructor(private readonly neo4j: Neo4jService){}

  async findAll(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('MATCH (n) RETURN n;');
  }
  async createBlock(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run(`create (b: Block {number: 9574304,
       hash: '0xdb9b830a99c947873a4701ed3109d865d6a9b9f98fb8067b27f83a2574a3e3eb',
       parentHash: '0x2890869d620c4182841e2523b63de11d89b8d775558e04d7a32912b5aa12dc4f', 
       nonce: '0x3d6baa4c067d5011',
       sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
       logsBloom: 'logsBloom',
       transactionsRoot: 'transactionsRoot',
       stateRoot: 'stateRoot',
       miner: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
       difficulty: '2,333,465,489,552,124',
       totalDifficulty: '14,323,550,361,188,041,689,972',
       extraData: 'extraData', size: '35,166 bytes',
       gasLimit: '9,980,893', gasUsed: '9,337,886 (93.56%)',
       timestamp: 'timestamp',
       transactions: 'transactions',
       uncles: 'uncles'})
    `)
  }
  async createTransaction(): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run(`CREATE (t: Transaction {blockHash: '0xdb9b830a99c947873a4701ed3109d865d6a9b9f98fb8067b27f83a2574a3e3eb',
     blockNumber: 9574304,
     from: '0xd00d1eEc7502d8A5a85FeEeE561352068B929a98',
     gas:97846,
     gasPrice: '1000000000',
     transactionHash: '0x7854c63c6519bcb46f29c65a282ff4056d662e7beeaff0b8aa060efaba1de83c',
     input: '0x6f652e1a000000000000000000000000d35147be6401dcb20811f2104c33de8e97ed68180000000000000000000000000000000000000000000000000000000000004c780000000000000000000000000000000000000000000000020f5b1eaad8d80000000000000000000000000000000000000000000000000000000001711e702c00',
     nonce: '211', r: '0x128e85690ac4d87078946e216f72abbd041319f92a3029ab5504f94c5fc1cb95',
     s: '0x7bec01488d585e97b1cf180dbd054bb9d15b0d068ead5c231e570207d537bc3c',
     to: '0x8e5660b4Ab70168b5a6fEeA0e0315cb49c8Cd539',
     transactionIndex: 115,
     v:'0x25',
     value: '0'})
    `)
  }
  async getBlock(blockNumber: Number): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')
  }
  async getTransactions(blockNumber: Number): Promise<any>{
    const session = await this.neo4j.getSesion();
    return session.run('')    
  }
}
