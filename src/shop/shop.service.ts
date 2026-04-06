import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Item } from './entities/item.entity';
import { Transaction } from './entities/transection.entity';
import { OrderItem } from './entities/order-item.entity';
import type { CartItem } from './interfaces/cart.interface';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    private dataSource: DataSource,
  ) { }

  async findAll(): Promise<Item[]> {
    return await this.itemRepo.find();
  }

  async findOne(id: number): Promise<Item | null> {
    return await this.itemRepo.findOne({ where: { id } });
  }

  async createItem(itemData: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepo.create(itemData);
    return await this.itemRepo.save(newItem);
  }
  async updateItem(item: Item): Promise<Item> {
    return await this.itemRepo.save(item);
  }
  async deleteItem(id: number): Promise<void> {
    await this.itemRepo.delete(id);
  }

  async checkout(
    cart: {itemId:number; quantity: number}[] | undefined,
    userId: string | null = null,
  ): Promise<boolean> {
    if (!cart || cart.length === 0) return false;

    let totalPrice = 0;
    let totalItem = 0;

    for (const cartItem of cart) {
      const item = await this.itemRepo.findOne({ where: { id:cartItem.itemId } });
      if(item){
        totalPrice += item.price * cartItem.quantity;
        totalItem += cartItem.quantity;
      }
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTransaction = queryRunner.manager.create(Transaction, {
        userId: userId,
        totalPrice: totalPrice,
        totalItem: totalItem,
        status: 'Complete',
      });

      const savedTransaction = await queryRunner.manager.save(newTransaction);
      for (const cartItem of cart) {
        const item = await queryRunner.manager.findOne(Item,{
          where: {id: cartItem.itemId},
          lock: {mode: 'pessimistic_write'}
        });
        if(!item || item.count< cartItem.quantity){
          throw new Error(
            `Product ${item?.name || 'ID '+ cartItem.itemId} มีในสต็อคไม่พอคับ`
          );
        }
        const orderItem = queryRunner.manager.create(OrderItem, {
          order_id: savedTransaction.id.toString(),
          product_id: item.id.toString(),
          quantity: cartItem.quantity,
          total_price: item.price * cartItem.quantity,
          priceAtPurchase: item.price,
        });
        await queryRunner.manager.save(orderItem);
        item.count -= cartItem.quantity;
        await queryRunner.manager.save(item);
      }
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(`Transaction Fail Rollingback : ${( error as Error).message} `);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async searchItems(query: string): Promise<Item[]> {
    if (!query) return [];
    return await this.itemRepo
      .createQueryBuilder('item')
      .where('item.name LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async getUserOrders(userId: string): Promise<Transaction[]> {
    return await this.transactionRepo.find({
      where: { userId },
      order: { id: 'DESC' },
    });
  }
}
