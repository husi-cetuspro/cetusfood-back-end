import {Cron} from "@nestjs/schedule";
import {PrismaService} from "../prisma/prisma.service";
import {Status} from "../status.enum";

export class SheduleService{
    constructor(private readonly prismaService: PrismaService) {}

    @Cron('10 0 1 * *')
    public async archiveOrdersEveryMonth(){
        let orders = await this.prismaService.order.findMany();
        for (let order of orders) {
            if(order.status != Status.CANCELLED){
                order.status = Status.ARCHIVE
            }
        }
    }
}