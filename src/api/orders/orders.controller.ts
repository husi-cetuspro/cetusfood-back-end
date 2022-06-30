import { Post, Body, Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service'
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { AddOrderDto } from './orders.dto';
import { Order as OrderModel } from '@prisma/client'

@ApiTags('order')
@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@ApiOperation({summary: "Dodaje zamowienie do bazy danych"})
	@ApiOkResponse({description: "ID zamówienia, które zostało dodane do bazy danych", type: 'integer', isArray: false})
	public async addOrder(@Body() dto: AddOrderDto): Promise<number> {
		return this.ordersService.addOrder(dto);
	}

	@Get()
	@ApiOperation({summary: "Zwraca listę wszystkich zamówień z tego dnia"})
	@ApiOkResponse({description: "Lista zamówień z tego dnia"})
	public async getAllOrders(): Promise<OrderModel[]> {
		return this.ordersService.getAllOrders();
	}
}
