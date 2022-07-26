import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors(); // TODO: Enable cors only for frontend server

	const options = new DocumentBuilder().setTitle("CetusFood API").build()
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	
	await app.listen(3000);
}

bootstrap();