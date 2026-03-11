import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import{ Item } from './entities/item.entity'

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>,
    ){}

    async findAll(): Promise<Item[]>{
        return await this.itemRepo.find();
    }
}
