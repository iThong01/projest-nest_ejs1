import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopService } from './shop/shop.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shopService: ShopService,
  ) {}

  @Get()
  @Render('index')
  async getHello() {
    const items = await this.shopService.findAll();
    return {
      myMessage: this.appService.getHello(),
      activeMenu: 'index',
      Item: items.slice(0, 3)
    };
  }
}
