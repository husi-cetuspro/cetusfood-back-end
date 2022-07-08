import { ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrderDto } from './user.orders.dto';
import { Order as OrderModel } from '@prisma/client'
import { JwtPayload } from 'src/auth/jwt.payload';

@Injectable()
export class UserOrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async addOrder(dto: AddOrderDto, accId: number): Promise<number> {
		const result: OrderModel = await this.prismaService.order.create({
			data: {
				accountId: accId,
				restaurantId: dto.restaurantId,
				content: dto.content,
			}
		});

		return result.id;
	}

	public async getAllOrders(): Promise<OrderModel[]> {
		return await this.prismaService.order.findMany();
	}
}
