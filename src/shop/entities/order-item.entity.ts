import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-item') 
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    order_id: string; 

    @Column({ type: 'varchar' })
    product_id: string; 

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'double' })
    total_price: number;

    @Column({ type: 'double',name: 'price_at_purchase'})
    priceAtPurchase: number;
}
