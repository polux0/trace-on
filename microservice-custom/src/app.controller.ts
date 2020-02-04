import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TickerServer } from './ticker.server'
import {MessagePattern, EventPattern} from '@nestjs/microservices';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly tickerServer: TickerServer) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @MessagePattern("TICK")
  public ticker(data: number): Promise<number> {
    return Promise.resolve(data);
  }
  @EventPattern("TICK")
  public ticky(data: number): Observable<Promise<number>>{
    return from(data.toFixed);
  }
}
