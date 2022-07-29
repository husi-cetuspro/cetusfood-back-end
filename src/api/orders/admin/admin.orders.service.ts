import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {Order as OrderModel} from '@prisma/client'

@Injectable()
export class AdminOrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllOrders(): Promise<OrderModel[]> {
		return await this.prismaService.order.findMany();
	}

	public async getOrderById(id: number): Promise<OrderModel> {
		return await this.prismaService.order.findFirst({
				where: { id: id }
			});
	}

	public async deleteOrder(id: number): Promise<void> {
			await this.prismaService.order.delete({
				where: { id: id }
			});
	}

	public async deleteOrders(): Promise<void> {
		await this.prismaService.order.deleteMany();
	}

	public async getUserCompletedOrders(id: number, status: string){
		return await this.prismaService.order.findMany({where: {accountId: id, status: status}})
	}

	public async getUserHistory(id: number){
		let orders = this.prismaService.order.findMany({
			where: { accountId: id }
		})
		let totalCoast = 0;
		for (let order of await orders) {
			let orderItem = await this.prismaService.orderItem.findFirst({
				where: { orderId: order.id }
			})
			let product = await this.prismaService.product.findFirst({
				where: { id: orderItem.productId }
			})
			totalCoast += product.price
		}
		return { amounToPay: totalCoast }
	}
}
