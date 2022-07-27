import {PrismaService} from "../../../prisma/prisma.service";
import {Injectable} from "@nestjs/common";
import {Status} from "../../../status.enum";

@Injectable()
export class UserProfileService{
    constructor(private readonly prismaService: PrismaService) {}

    public async getUserProfile(id: number, status: string){
        let profileOrders = await this.prismaService.order.findMany({where: {accountId: id, status}})

        let totalCoast = 0;
        for (let order of profileOrders) {
            if(order && order.status == Status.COMPLETED){
                let orderItem = await this.prismaService.orderItem.findFirst({where: { orderId: order.id }})
                let product = await this.prismaService.product.findFirst({where: { id: orderItem.productId }})
                if(product){
                    totalCoast += product.price
                }
            }
        }

        return {
            totalAmountToPay: totalCoast,
            totalOrders: profileOrders.length,
            orders: profileOrders
        }
    }
}