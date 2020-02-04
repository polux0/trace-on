import { Server, CustomTransportStrategy, MessageHandler } from "@nestjs/microservices";
import {Ticker} from './ticker';
import { Injectable } from "@nestjs/common";

@Injectable()
export class TickerServer extends Server implements CustomTransportStrategy{
    private ticker: Ticker;

    listen(callback: () => void): void {
        this.ticker = new Ticker();
        this.ticker.start();
        this.ticker.on('data', (e: number)=>{
            this.listener(e);
        });
        callback();

    }
    public async listener(e: number): Promise<void> {
        console.log("happend?")
        const handler: MessageHandler | undefined = this.messageHandlers.get("TICK");
        if (!handler) {
          return;
        }
        const result = await handler(e);
        console.log(result);
      }
    
    close(): void {
        this.ticker.stop();
    }


}