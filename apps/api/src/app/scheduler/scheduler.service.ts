import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { RedisLockService } from '@huangang/nestjs-simple-redis-lock';
import { AppService } from "../app.service";

@Injectable()
export class SchedulerService {
    constructor(
        protected readonly lockService: RedisLockService,
        protected readonly appService: AppService){}

    @Cron(process.env.CLICK_BACKUP_CRON)
    async handleCron() {
        try {
            await this.lockService.lock(process.env.REDIS_NAME);
            this.appService.updateClicksInDb();
        }
        finally {
            this.lockService.unlock(process.env.REDIS_NAME); 
        }  
    }    
}    

