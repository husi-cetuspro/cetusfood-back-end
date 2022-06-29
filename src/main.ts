import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);

	const options = new DocumentBuilder().setTitle("CetusFood API").build()
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors(); // TODO: Enable cors only for frontend server

	await app.listen(3000);
}

bootstrap();
