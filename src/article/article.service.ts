import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private itemRepo: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.itemRepo.find();
  }
  async createArticle(articleData: Partial<Article>): Promise<Article> {
      const newArticle = this.itemRepo.create(articleData);
      return await this.itemRepo.save(articleData);
  }
  async deleteArticle(id:number): Promise<void>{
    await this.itemRepo.delete(id);
  }
}
