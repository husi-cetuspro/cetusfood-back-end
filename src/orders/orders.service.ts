import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
	constructor(@InjectRepository(Order) private readonly repository: Repository<Order>) {}

	public async add(Order: Order): Promise<Order> {
		const date: Date = new Date();
		if((date.getHours() == 12 && date.getMinutes()>= 50)||(date.getHours()>12))
			return null;

		return this.repository.save(Order);
	}
}
