import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
	constructor(@InjectRepository(Order) private readonly repository: Repository<Order>) {}

	public async add(Order: Order): Promise<Order> {
		return this.repository.save(Order);
	}
}
