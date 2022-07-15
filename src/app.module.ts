import { Module } from '@nestjs/common';
import { RestaurantsModule } from './api/restaurants/restaurants.module';
import { OrdersModule } from './api/orders/orders.module';
import { PrismaService } from './prisma/prisma.service';
import { AccountModule } from './api/account/account.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AtGuard } from './auth/at.guard';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [
		RestaurantsModule,
		OrdersModule,
		AccountModule,
		AuthModule,
		JwtModule,
		ConfigModule.forRoot({envFilePath: '.env'}),
		MailModule,
	],
	providers: [
		Reflector,
		PrismaService,
		AuthService,
		ConfigService,
		{
			provide: APP_GUARD,
			useClass: AtGuard
		},
	],
})
export class AppModule {}
