import { Module } from '@nestjs/common';
import { UserRestaurantsController } from './user/user.restaurants.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { UserRestaurantsService } from './user/user.restaurants.service';
import { AdminRestaurantsService } from './admin/admin.restaurants.service';
import { AdminRestaurantsController } from './admin/admin.restaurants.controller';

@Module({
	imports: [MulterModule.register({
		dest: './logoFiles',
	})],
	controllers: [UserRestaurantsController, AdminRestaurantsController],
	providers: [PrismaService, UserRestaurantsService, AdminRestaurantsService]	
})
export class RestaurantsModule {}
