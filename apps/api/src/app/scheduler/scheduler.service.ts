import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { AppService } from "../app.service";
import { ConfigService } from "@nestjs/config";
import { TelemetryService } from "../telemetry/telemetry.service";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class SchedulerService {
    constructor(
        private configService: ConfigService,
        private readonly telemetryService: TelemetryService,
        protected readonly appService: AppService){}

// TODO: add dynamic configuration        
    @Cron(process.env.CLICK_BACKUP_CRON)
    async handleCron() {
        const cronId = uuidv4();
        try {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "updateClicksInDb cron started", {cronId: cronId, ts: Date.now()})
            // this.appService.updateClicksInDb();
        }
        catch (err) {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in updateClicksInDb cron", {error: err.message})
            return '';
        }
        finally {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "updateClicksInDb cron completed", {cronId: cronId, ts: Date.now()})
            return '';
        }  
    }    
}    

