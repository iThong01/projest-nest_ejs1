import { Controller, Get, Post, Render, Req, Res, Body, Param, Session} from '@nestjs/common';
import { ArticleService } from './article.service';
import type { Request, Response } from 'express';

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
      word: 'Herb Article',
      activeMenu: 'article',
      ItemCartCount: cartCount,
    };
  }

  @Get('create')
  async getCreateArticlePage(
    @Session() session: any,
    @Res() res: Response
  ){
    if(!session || session.role !== 'admin'){
      return res.redirect('/article');
    }
    return res.render('article/create',{
      activeMenu: 'article'
    });
  }

  @Post('create')
  async createArticle(
    @Body() body: any,
    @Session() session: any,
    @Res() res: Response
  ){
    if(!session || session.role !== 'admin'){
      return res.redirect('/article');
    }
    const date = new Date().toLocaleDateString('th-TH',{
      year:'numeric',
      month: 'long',
      day: 'numeric'
    });
    try{
      await this.articleService.createArticle({
        name: body.name,
        head:body.head,
        detail: body.detail,
        date: date
      });
      return res.redirect('/article');
    }catch(err){
      console.error('Error create article : ', err);
      return res.redirect('/article/create');
    }
  }

  @Post('delete/:id')
  async deleteArticle(
    @Param('id') id: string,
    @Session() session: any,
    @Res() res: Response
  ){
    if(!session || session.role !== 'admin'){
      return res.redirect('/article');
    }
    try{
      await this.articleService.deleteArticle(parseInt(id));
      return res.redirect('/article');
    }catch(err){
      console.error('Error delete article: ',err);
      return res.redirect('/article');
    }
  }
}
