import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	imports: [],
	controllers: [RestaurantsController],
	providers: [PrismaService, RestaurantsService]	
})
export class RestaurantsModule {}
