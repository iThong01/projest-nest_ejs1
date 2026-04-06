import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transection')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column({ type: 'double', name: 'totalprice' })
  totalPrice: number;

  @Column({ type: 'int', name: 'totalitem' })
  totalItem: number;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created-at' })
  createdAt: Date;
}
