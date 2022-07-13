
import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AdminOrdersService } from './admin.orders.service'
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Order as OrderModel } from '@prisma/client'
import { IsAdminGuard } from 'src/auth/admin.guard';

@ApiBearerAuth()
@UseGuards(IsAdminGuard)
@Controller('admin/orders')
@ApiTags('ADMIN - order')
export class AdminOrdersController {
	constructor(private readonly ordersService: AdminOrdersService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca listę wszystkich zamówień z tego dnia"})
	@ApiOkResponse({description: "Lista zamówień z tego dnia"})
	public async getAllOrders(): Promise<OrderModel[]> {
		return this.ordersService.getAllOrders();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca zamówienie o podanym id"})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść zamówienia o podanym id'})
	public async getOrderById(@Param('id') id: string): Promise<OrderModel> {
		return await this.ordersService.getOrderById(parseInt(id));
	}
}