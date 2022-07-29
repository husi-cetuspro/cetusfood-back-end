import {Global, Module} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {SheduleService} from "./shedule.service";

@Global()
@Module({
    providers: [PrismaService, SheduleService],
})

export class SheduleModule{}