import { Controller, Get, Render, Req } from '@nestjs/common';
import type { Request } from 'express';
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
  async getHello(@Req() req: Request) {
    const items = await this.shopService.findAll();
    let cart = req.cookies?.cart || [];
    const cartCount = cart ? cart.length : 0;
    return {
      myMessage: this.appService.getHello(),
      activeMenu: 'index',
      Item: items.slice(0, 3),
      ItemCartCount: cartCount,
    };
  }
}
