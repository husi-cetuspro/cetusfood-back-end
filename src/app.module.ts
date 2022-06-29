import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		RestaurantsModule,
		OrdersModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'cetusfood.sqlite',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		})
	],
	providers: [],
})
export class AppModule {}
