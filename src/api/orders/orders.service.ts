import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddOrderDto } from './orders.dto';
import { Order as OrderModel } from '@prisma/client'

// TODO: codziennie o 13:00 wszystkie zamówienia wysłać do restauracji, wysłane zamówienia usunąć z tabeli

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async addOrder(dto: AddOrderDto): Promise<number> {
		const result: OrderModel = await this.prismaService.order.create({data: {
			restaurantId: dto.restaurantId,
			content: dto.content,
		}});

		return result.id;
	}

	public async getAllOrders(): Promise<OrderModel[]> {
		return await this.prismaService.order.findMany();
	}
}
