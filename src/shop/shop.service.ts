import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import{ Item } from './entities/item.entity'
import { Transaction } from './entities/transection.entity';
import { OrderItem } from './entities/order-item.entity';
import type { MySessionData } from './interfaces/cart.interface';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Item)
        private itemRepo: Repository<Item>,
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
        @InjectRepository(OrderItem)
        private orderItemRepo: Repository<OrderItem>,
    ){}

    async findAll(): Promise<Item[]>{
        return await this.itemRepo.find();
    }

    async findOne(id: number): Promise<Item | null> {
        return await this.itemRepo.findOne({ where: { id } });
    }

    async createItem(itemData: Partial<Item>): Promise<Item>{
        const newItem = this.itemRepo.create(itemData);
        return await this.itemRepo.save(newItem);
    }

    async checkout(cart: MySessionData['cart'], userId: string | null = null): Promise<boolean> {
        if (!cart || cart.length === 0) return false;

        let totalPrice = 0;
        let totalItem = 0;

        for (const cartItem of cart) {
            totalPrice += cartItem.item.price * cartItem.quantity;
            totalItem += cartItem.quantity;
        }

        const newTransaction = this.transactionRepo.create({
            userId: userId,
            totalPrice: totalPrice,
            totalItem: totalItem,
            status: 'Completed'
        });
        const savedTransaction = await this.transactionRepo.save(newTransaction);

        for (const cartItem of cart) {
            const orderItem = this.orderItemRepo.create({
                order_id: savedTransaction.id.toString(),
                product_id: cartItem.item.id.toString(),
                quantity: cartItem.quantity,
                total_price: cartItem.item.price * cartItem.quantity,
                priceAtPurchase: cartItem.item.price,
            });
            await this.orderItemRepo.save(orderItem);

            const item = await this.itemRepo.findOne({ where: { id: cartItem.item.id } });
            if (item && item.count >= cartItem.quantity) {
                item.count -= cartItem.quantity;
                await this.itemRepo.save(item);
            }
        }

        return true;
    }

    async searchItems(query: string): Promise<Item[]> {
        if (!query) return [];
        return await this.itemRepo.createQueryBuilder('item')
            .where('item.name LIKE :query', { query: `%${query}%` })
            .getMany();
    }
}