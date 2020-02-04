
import { Controller, Get, Inject } from '@nestjs/common';
import {Observable, from, observable} from 'rxjs';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(@Inject('ECHO_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap(){
    try {
      await this.client.connect();
    } 
    catch (error) {
      console.log('Error occured during connection: ', error);
    }
    
  }
  @Get()
  getHello(): string {
     const aebre = this.client.emit<any>('echo', new String('client says hello'));
     console.log('happend');
     aebre.subscribe(console.log)

     return 'Message: `client says hello` is sent';
  }
}
