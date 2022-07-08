import { Module } from '@nestjs/common';
import { UserOrdersService } from './user/user.orders.service';
import { UserOrdersController as UserOrdersController } from './user/user.orders.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminOrdersController } from './admin/admin.orders.controller';
import { AdminOrdersService } from './admin/admin.orders.service';

@Module({
	imports: [],
	controllers: [UserOrdersController, AdminOrdersController],
	providers: [PrismaService, UserOrdersService, AdminOrdersService]	
})
export class OrdersModule {}