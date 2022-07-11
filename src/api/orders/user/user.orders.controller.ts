import { Post, Body, Controller, Get, HttpCode, HttpStatus, UseGuards, Req, Logger } from '@nestjs/common';
import { UserOrdersService } from './user.orders.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { AddOrderDto } from './user.orders.dto';
import { IsUserGuard } from 'src/auth/user.guard';
import { Request } from 'express';

@Controller('user/orders')
@UseGuards(IsUserGuard)
@ApiBearerAuth()
@ApiTags('USER - order')
export class UserOrdersController {
	constructor(private readonly ordersService: UserOrdersService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Dodaje zamowienie do bazy danych"})
	@ApiOkResponse({description: "ID zamówienia, które zostało dodane do bazy danych", type: 'integer', isArray: false})
	public async addOrder(@Body() dto: AddOrderDto, @Req() req: Request): Promise<number> {
		return this.ordersService.addOrder(dto, req["user"].accId);
	}
}