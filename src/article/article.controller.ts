import { Controller, Get, Render, Session } from '@nestjs/common';
import { ArticleService } from './article.service';
import type { MySessionData } from '../shop/interfaces/cart.interface';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService ){}
    
    @Get()
    @Render('article/article')
    async getArticle(@Session() session: MySessionData){
        const items = await this.articleService.findAll();
        const cartCount = session?.cart ? session.cart.length : 0;
        
        return{
            Item : items,
            word:'Article',
            activeMenu: 'article',
            ItemCartCount: cartCount
        };
    }
}
