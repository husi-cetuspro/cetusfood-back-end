import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [MulterModule.register({
		dest: './logoFiles',
	})],
	controllers: [RestaurantsController],
	providers: [PrismaService, RestaurantsService]	
})
export class RestaurantsModule {}
