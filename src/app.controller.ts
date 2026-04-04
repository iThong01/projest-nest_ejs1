import { Controller, Get, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopService } from './shop/shop.service';
import type { MySessionData } from './shop/interfaces/cart.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shopService: ShopService,
  ) {}

  @Get()
  @Render('index')
  async getHello(@Session() session: MySessionData) {
    const items = await this.shopService.findAll();
    const cartCount = session.cart ? session.cart.length : 0;
    return {
      myMessage: this.appService.getHello(),
      activeMenu: 'index',
      Item: items.slice(0, 3),
      ItemCartCount: cartCount
    };
  }
}
