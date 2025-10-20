import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('string')
    description!: string;

    @Column('simple-array')
    ingredients!: string[];

    @Column()
    preparationTime!: number;

}
