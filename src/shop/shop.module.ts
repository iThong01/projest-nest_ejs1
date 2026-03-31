import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Transaction } from './entities/transection.entity';
import { OrderItem } from './entities/order-item.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Item, Transaction, OrderItem])],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService]
})
export class ShopModule {}
