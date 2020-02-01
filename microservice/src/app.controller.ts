import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(){}
  @EventPattern('echo')
  handleEchoMessage(data: string) {
    console.log('Microservice received data: ' + data);
  }
}
