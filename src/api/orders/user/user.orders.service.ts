import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrderDto } from './user.orders.dto';
import { Order as OrderModel } from '@prisma/client';
import { ApiNoContentResponse } from '@nestjs/swagger';

@Injectable()
export class UserOrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async addOrder(dto: AddOrderDto, accId: number): Promise<number> {
		const now: Date = new Date();
		const maxDate: Date = new Date();
		maxDate.setTime(now.getTime());
		maxDate.setHours(12,50);

		if(now > maxDate) {
			throw new BadRequestException('Nie można składać zamówień po godzinie 12:50');
		}


		const result: OrderModel = await this.prismaService.order.create({
			data: {
				accountId: accId,
				restaurantId: dto.restaurantId,			
			}
		});



		return result.id;
	}
}