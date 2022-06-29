import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		RestaurantsModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'cetusfood.sqlite',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true
		}),
	],
	providers: [],
})
export class AppModule {}
