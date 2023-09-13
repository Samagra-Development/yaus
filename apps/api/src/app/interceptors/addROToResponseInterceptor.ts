import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { map, Observable } from "rxjs";
import { TelemetryService } from "../telemetry/telemetry.service";
import { URLSearchParams } from "url";

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg

export interface Response<T> {
  data: T;
}

/**
 * @description
 * Adds response object created in addResponseObject.interceptor.ts to the response body.
 */
@Injectable()
export class AddROToResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    private readonly telemetryService: TelemetryService,
    private configService: ConfigService
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        let name: string;
        console.log(`Execution Time: ${Date.now() - now}ms`);

        const rawUrl = decodeURIComponent(req?.raw?.url);
        const url = rawUrl.split("?")?.[0];
        const urlSearchParams = new URLSearchParams(rawUrl.split("?")?.[1]);

        this.telemetryService.sendEvent(
          this.configService.get<string>("POSTHOG_DISTINCT_KEY"),
          `Endpoint accessed`,
          {
            routeName: name,
            executionTime: `${Date.now() - now}ms`,
            url: req.url,
            queryParams: Object.fromEntries(urlSearchParams.entries()),
          }
        );
        return data;
      })
    );
  }
}
