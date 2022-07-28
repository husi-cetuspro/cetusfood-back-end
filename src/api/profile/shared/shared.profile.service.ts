import {PrismaService} from "../../../prisma/prisma.service";
import {Injectable, Logger} from "@nestjs/common";
import {Status} from "../../../status.enum";
import {InvalidValueException} from "../../../exceptions/invalidValue.exception";
import {ProfileDto} from "../dto/profile.dto";

@Injectable()
export class SharedProfileService{
    constructor(private readonly prismaService: PrismaService) {}

    public async getUserProfile(id: string, status: string): Promise<ProfileDto>{
        try{
            let accountId = parseInt(id)
            let profileOrders = await this.prismaService.order.findMany({where: {accountId: accountId, status}})

            let totalCosts = 0;
            for (let order of profileOrders) {
                if(order && order.status == Status.COMPLETED){
                    let orderItem = await this.prismaService.orderItem.findFirst({where: { orderId: order.id }})
                    let product = await this.prismaService.product.findFirst({where: { id: orderItem.productId }})
                    if(product) totalCosts += product.price
                }
            }

            return {
                totalAmountToPay: totalCosts,
                totalOrders: profileOrders.length,
                orders: profileOrders
            }
        }catch (error){
            throw new InvalidValueException()
        }
    }
}