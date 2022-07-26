import { Post, Param, Delete, Body, Controller, Get, HttpCode, HttpStatus, UseGuards, Req, Logger } from '@nestjs/common';
import { UserOrdersService } from './user.orders.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiNotFoundResponse} from '@nestjs/swagger';
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

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Anuluje zamówienie o podanym id"})
	@ApiOkResponse({description: 'Zamówienie zostało pomyślnie anulowane'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść zamówienia o podanym id'})
	public async cancelOrder(@Param('id') id: string): Promise<void> {
		return await this.ordersService.cancelOrder(parseInt(id));
	}
}

