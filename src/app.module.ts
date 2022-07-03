import { Module } from '@nestjs/common';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { OrdersModule } from './api/orders/orders.module';
import { PrismaService } from './prisma/prisma.service';
import { AccountModule } from './api/account/account.module';

@Module({
	imports: [
		RestaurantsModule,
		OrdersModule,
		AccountModule,
	],
	providers: [PrismaService],
	controllers: [],
})
export class AppModule {}
