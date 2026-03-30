import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private itemRepo: Repository<Article>,
    ) { }
    
    async findAll(): Promise<Article[]> {
        return await this.itemRepo.find();
    }
    // async createItem(itemData: Partial<Item>): Promise<Item> {
    //     const newItem = this.itemRepo.create(itemData);
    //     return await this.itemRepo.save(newItem);
    // }
}
