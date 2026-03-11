import { Controller,Get, Render } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService ){}
    @Get()
    @Render('article/article')
    getArticle(){
        return{
            word:'Article',
            activeMenu: 'article'
        };
    }
}
