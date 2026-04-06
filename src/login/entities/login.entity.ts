import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Acc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  lname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  user: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;
}
