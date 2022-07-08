import { Post, Body, Controller, Get, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserOrdersService } from './user.orders.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { AddOrderDto } from './user.orders.dto';
import { IsUserGuard } from 'src/auth/user.guard';
import { AuthUser } from 'src/auth/authuser.decorator';
import { JwtPayload } from 'src/auth/jwt.payload';

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
	public async addOrder(@Body() dto: AddOrderDto, @AuthUser() user: JwtPayload): Promise<number> {
		return this.ordersService.addOrder(dto, user.accId);
	}
}