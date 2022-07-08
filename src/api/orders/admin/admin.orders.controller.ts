
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminOrdersService } from './admin.orders.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Order as OrderModel } from '@prisma/client'
import { IsAdminGuard } from 'src/auth/admin.guard';

@Controller('admin/orders')
@ApiBearerAuth()
@UseGuards(IsAdminGuard)
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
}