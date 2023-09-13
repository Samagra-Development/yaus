import { Injectable, OnModuleInit } from "@nestjs/common";
import { PosthogService } from "nestjs-posthog";

@Injectable()
export class TelemetryService {
  constructor(private readonly client: PosthogService) {}

  async sendEvent(
    distinctId: string,
    event: string,
    data: Record<string | number, any>
  ) {
    try {
      await this.client.capture({
        distinctId: distinctId,
        event: event,
        properties: data,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
