
import {Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, UseGuards} from '@nestjs/common';
import { AdminOrdersService } from './admin.orders.service'
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Order as OrderModel } from '@prisma/client'
import { IsAdminGuard } from 'src/auth/admin.guard';
import {IsInt} from "class-validator";

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

	@Get('/:id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca zamówienie o podanym id"})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść zamówienia o podanym id'})
	public async getOrderById(@Param('id') id: string): Promise<OrderModel> {
		return await this.ordersService.getOrderById(parseInt(id));
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa zamówienie o podanym id"})
	@ApiOkResponse({description: 'Zamówienie zostało pomyślnie usunięte'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść zamówienia o podanym id'})
	public async deleteRestaurant(@Param('id') id: string): Promise<void> {
		return await this.ordersService.deleteOrder(parseInt(id));
	}

	@Delete('/all')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa wszystkie zamówienia"})
	@ApiOkResponse({description: 'Zamówienia zostały pomyślnie usunięte'})
	public async deleteAllOrders(): Promise<void> {
		return await this.ordersService.deleteOrders();
	}


	@Get('/user/:id')
	@HttpCode(200)
	public async getUserHistory(@Param("id") userId: string, @Query("status") status?: string){
		return await this.ordersService.getUserCompletedOrders(parseInt(userId), status)
	}

	@Get('/user/topay/:id')
	@HttpCode(200)
	public async getCountToPay(@Param("id") userId: string){
		return await this.ordersService.getUserHistory(parseInt(userId))
	}
}