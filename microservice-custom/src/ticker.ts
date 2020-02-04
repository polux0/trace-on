import {EventEmitter} from 'events';

export class Ticker extends EventEmitter{
    private intrevalId: NodeJS.Timeout | null = null;

    start(): void {
        console.log('start happend');
        this.intrevalId = setInterval(()=>{
            this.emit("data", Date.now())
        }, 1000)
    }
    stop(): void {
        console.log('stop happend');
        if(this.intrevalId){
            clearInterval(this.intrevalId);
        }
    }

}