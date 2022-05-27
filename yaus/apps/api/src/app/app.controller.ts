import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { AppService } from './app.service';
import { RouterService } from './router/router.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly routerService: RouterService,
    @Inject('CLICK_SERVICE') private clickServiceClient: ClientProxy
  ) {}

  //http://localhost:3333/api/redirect/208
  @Get('/:hashid')
  async redirect(@Param('hashid') hashid: string, @Res() res) {
    console.log(hashid);
    const reRouteURL: string = await this.routerService.redirect(hashid);
    this.clickServiceClient
      .send('onClick', {
        hashid: parseInt(hashid),
      })
      .subscribe();
    if (reRouteURL !== '') {
      return res.redirect(reRouteURL);
    } else {
      throw new NotFoundException();
    }
  }

  @MessagePattern('onClick')
  async getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext
  ) {
    console.log(`Pattern: ${context.getPattern()}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage().content.toString();
    console.log(`Message: ${originalMsg}`);
    await this.appService.updateClicks(JSON.parse(originalMsg).data.hashid);
  }
}
