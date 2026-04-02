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
    
    @Column({
        type: 'longblob', 
        nullable: true,
        transformer: {
            to(value: string | Buffer): Buffer | null {
                if (!value) return null;
                if (typeof value === 'string') return Buffer.from(value, 'base64');
                return value;
            },
            from(value: Buffer | string): string | null {
                if (!value) return null;
                if (typeof value === 'string') return value;
                return value.toString('base64');
            }
        }
    })
    image: string | Buffer | null;
}