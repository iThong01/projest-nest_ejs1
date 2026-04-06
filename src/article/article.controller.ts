import { Controller, Get, Render, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import type { Request } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @Render('article/article')
  async getArticle(@Req() req: Request) {
    const items = await this.articleService.findAll();
    let cart = req.cookies?.cart || [];
    const cartCount = cart.length;

    return {
      Item: items,
      word: 'Article',
      activeMenu: 'article',
      ItemCartCount: cartCount,
    };
  }
}
