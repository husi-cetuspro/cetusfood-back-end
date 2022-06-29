import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Restaurant {
	@ApiResponseProperty()
	@PrimaryGeneratedColumn('increment')
	id: number

	@ApiProperty()
	@Column()
	name: string

	@ApiProperty()
	@Column()
	mail: string

	@ApiProperty()
	@Column()
	url: string

	@ApiResponseProperty()
	@CreateDateColumn()
	createdAt: Date;

	@ApiResponseProperty()
	@UpdateDateColumn()
	updatedAt: Date;
}
