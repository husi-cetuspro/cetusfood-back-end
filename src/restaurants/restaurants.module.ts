import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './restaurants.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Restaurant])],
	controllers: [RestaurantsController],
	providers: [RestaurantsService]	
})
export class RestaurantsModule {}
