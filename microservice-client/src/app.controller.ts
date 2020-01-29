import { Controller, Get, Inject } from '@nestjs/common';
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
     this.client.send('echo', new String('client says hello'));
     console.log('This happend');
     return 'Message: client says hello is sent';
  }
}
