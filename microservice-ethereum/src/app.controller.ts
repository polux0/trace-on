import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Block } from 'web3-eth/types';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  @EventPattern('echo')
  handleEchoMessage(data: string): String {
    console.log('Microservice received data: ' + data);
    return "Kidanje";
  }
  @MessagePattern('block')
  public block(block:Block): Observable<Object>{
    return from(block.transactions);
  }

}
