import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Restaurant {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	name: string

	@Column()
	mail: string

	@Column()
	url: string

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
