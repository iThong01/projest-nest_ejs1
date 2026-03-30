import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('shop')
export class Item{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'double'})
    price: number;

    @Column({type: 'int', default: 0})
    count: number;

    @Column({type: 'text', nullable: true})
    description: string;
    
    @Column({type: 'varchar', length: 255, nullable: true})
    image: string;
}