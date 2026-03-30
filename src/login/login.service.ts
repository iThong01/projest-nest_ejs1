import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acc } from './entities/login.entity'

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Acc)
        private itemRepo: Repository<Acc>,
    ) { }
    async createItem(itemData: Partial<Acc>): Promise<Acc> {
        const newItem = this.itemRepo.create(itemData); //ยังไม่ทำหน้าfrom รับข้อมูล
        return await this.itemRepo.save(newItem);
    }
    async editItem(itemEdit: Partial<Acc> & {id :number}){
        const { id, ...updateData } = itemEdit;
        await this.itemRepo.update(id, updateData);
        const updateItem = await this.itemRepo.findOne({ where: {id:id}});
        return updateItem ;
    }
    async findUsername(username: string){
        return await this.itemRepo.findOne({where: { user: username}})
    }
}
