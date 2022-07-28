import {Cron} from "@nestjs/schedule";
import {PrismaService} from "../prisma/prisma.service";
import {Status} from "../status.enum";
import {MailService} from "../mail/mail.service";
import {Logger} from "@nestjs/common";

export class SheduleService{
    constructor(private readonly prismaService: PrismaService,
                private readonly mailService: MailService) {}

    @Cron('10 0 1 * *')
    public async archiveOrdersEveryMonth(){
        let orders = await this.prismaService.order.findMany();
        for (let order of orders) {
            if(order.status != Status.CANCELLED){
                order.status = Status.ARCHIVE
            }
        }
    }

    @Cron('0 13 * * 1-5')
    public async sendEmailToResteurant(){
        let resteurants = await this.prismaService.restaurant.findMany();

        for (let resteurant of resteurants){
            let orders = await this.prismaService.order.findMany()
            let items = [];
            for (const order of orders) {
                if(order.restaurantId === resteurant.id){
                    if(order.status == Status.PENDING){
                        try{
                            let orderItem = await this.prismaService.orderItem.findFirst({ where: { orderId: order.id }});
                            let product = await this.prismaService.product.findFirst({ where: { id: orderItem.productId }})

                            items.push(product)

                            await this.prismaService.order.update({
                                data: { status: Status.DELIVERED },
                                where: { id: order.id }
                            })
                        }catch (error){
                            Logger.error(error);
                        }
                    }
                }
            }
            await this.mailService.sendOrdersToRestaurant(items, resteurant)
        }
    }
}