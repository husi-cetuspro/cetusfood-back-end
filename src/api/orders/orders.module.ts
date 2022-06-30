import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	imports: [],
	controllers: [OrdersController],
	providers: [PrismaService, OrdersService]	
})
export class OrdersModule {}
