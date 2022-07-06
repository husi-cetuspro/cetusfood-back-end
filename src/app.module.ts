import { Module } from '@nestjs/common';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { OrdersModule } from './api/orders/orders.module';
import { PrismaService } from './prisma/prisma.service';
import { AccountModule } from './api/account/account.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		RestaurantsModule,
		OrdersModule,
		AccountModule,
		AuthModule,
	],
	providers: [PrismaService, AuthService],
	controllers: [],
})
export class AppModule {}
