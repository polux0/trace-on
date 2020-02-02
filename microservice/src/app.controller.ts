import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Block } from 'web3-eth/types';
import { Observable, from } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService:AppService){}
  @EventPattern('echo')
  handleEchoMessage(data: string) {
    console.log('Microservice received data: ' + data);
  }
  @MessagePattern('BLOCK')
  public block(block:Block): Observable<Object>{
    return from(block.transactions);
  }

}
