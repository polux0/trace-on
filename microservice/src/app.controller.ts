import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({command: 'echo'})
  echo(data: string): string {
    console.log('Data has arrived: ', data);
    return data.toUpperCase();
  }
}
