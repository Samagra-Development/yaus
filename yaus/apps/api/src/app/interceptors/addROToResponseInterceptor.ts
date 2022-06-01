import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
import { TelemetryService } from '../telemetry/telemetry.service';
  
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
    constructor(private readonly telemetryService: TelemetryService){}
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      const now = Date.now();
      const req = context.switchToHttp().getRequest();;
      return next.handle().pipe(
        map((data) => {
          let name: string;
          console.log(`Execution Time: ${Date.now() - now}ms`)
          this.telemetryService.sendEvent(process.env.POSTHOG_DISTINCT_KEY, `${req.raw.url} Execution Time`, {routeName:name, executionTime: `${Date.now() - now}ms`})
          return data;
        }),
      );
    }
  }
  