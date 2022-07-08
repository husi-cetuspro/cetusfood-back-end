import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order as OrderModel } from '@prisma/client'

@Injectable()
export class AdminOrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllOrders(): Promise<OrderModel[]> {
		return await this.prismaService.order.findMany();
	}
}
