import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
	imports: [RestaurantsModule],
})
export class AppModule {}
