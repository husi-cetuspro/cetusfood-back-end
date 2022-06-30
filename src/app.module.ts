import { Module } from '@nestjs/common';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { OrdersModule } from './api/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [
		RestaurantsModule,
		OrdersModule,
	],
	providers: [PrismaService],
})
export class AppModule {}
