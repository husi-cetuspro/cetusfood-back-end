import {PrismaService} from "../../../prisma/prisma.service";
import {Injectable} from "@nestjs/common";
import {Status} from "../../../status.enum";
import {InvalidValueException} from "../../../exceptions/invalidValue.exception";

@Injectable()
export class SharedProfileService{
    constructor(private readonly prismaService: PrismaService) {}

    public async getUserProfile(id: string, status: string){
        try{
            let accountId = parseInt(id)
            let profileOrders = await this.prismaService.order.findMany({where: {accountId: accountId, status}})

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
        }catch (error){
            throw new InvalidValueException()
        }
    }
}