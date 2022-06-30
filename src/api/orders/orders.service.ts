import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrderDto } from './orders.dto';
import { Order as OrderModule } from '@prisma/client'

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async addOrder(dto: AddOrderDto): Promise<number> {
		const result: OrderModule = await this.prismaService.order.create({data: {
			restaurantId: dto.restaurantId,
			content: dto.content,
		}});

		return result.id;
	}
}
