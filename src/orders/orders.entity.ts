import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {

	@ApiResponseProperty()
	@PrimaryGeneratedColumn('increment')
	id: number

	@ApiProperty()
	@Column()
	employeeID: number

	@ApiProperty()
	@Column()
	restaurantID: number

	@ApiProperty()
	@Column()
	text: string

}
