import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class task{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false,type:'text'})
    title:string;
    @Column({nullable:false, default:false})
    state:boolean;
}