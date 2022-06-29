import { Post, Param, Delete, Body, Put, Get, Controller } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service'
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';

@ApiTags('order')
@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Put()
	@ApiOperation({summary: "Dodaje zamowienie do bazy danych"})
	@ApiOkResponse({description: "Zamowienie, ktore został dodany do bazy danych", type: Order, isArray: false})
	public async add(@Body() Order: Order): Promise<Order> {
		return await this.ordersService.add(Order);
	}
}