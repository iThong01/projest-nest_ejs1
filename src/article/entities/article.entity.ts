import{Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('article')
export class Article{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text', nullable: true})
    head: string;

    @Column({type: 'text', nullable: true})
    detail: string;

    @Column({type: 'varchar'})
    date: string;

    // @Column({type:'varchar'})
    // nameWrite: string

    // @Column({type:'varchar'})
    // role : string
}