import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AppService } from "../app.service";
import { ConfigService } from "@nestjs/config";
import { TelemetryService } from "../telemetry/telemetry.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SchedulerService {
  constructor(
    private configService: ConfigService,
    private readonly telemetryService: TelemetryService,
    protected readonly appService: AppService
  ) {}
}
