import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { RedisLockService } from '@huangang/nestjs-simple-redis-lock';
import { AppService } from "../app.service";
import { ConfigService } from "@nestjs/config";
import { TelemetryService } from "../telemetry/telemetry.service";

@Injectable()
export class SchedulerService {
    constructor(
        private configService: ConfigService,
        private readonly telemetryService: TelemetryService,
        protected readonly lockService: RedisLockService,
        protected readonly appService: AppService){}

// TODO: add dynamic configuration        
    @Cron(process.env.CLICK_BACKUP_CRON)
    async handleCron() {
        try {
            await this.lockService.lock(this.configService.get<string>('REDIS_NAME'));
            this.appService.updateClicksInDb();
        }
        catch (err) {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in updateClicksInDb cron", {error: err})
            return '';
        }
        finally {
            this.lockService.unlock(this.configService.get<string>('REDIS_NAME')); 
        }  
    }    
}    

