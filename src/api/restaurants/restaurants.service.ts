import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant as RestaurantModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AddRestaurantDto, EditRestaurantDto } from './restaurants.dto';

@Injectable()
export class RestaurantsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllRestaurants(): Promise<RestaurantModel[]> {
		return this.prismaService.restaurant.findMany();
	}

	public async getRestaurantById(id: string): Promise<RestaurantModel> {
		const result: RestaurantModel = await this.prismaService.restaurant.findFirst({
			where: { id: parseInt(id) }
		});

		if(!result) {
			throw new NotFoundException();
		}

		return result;
	}

	public async getRestaurantsByName(name: string): Promise<RestaurantModel[]> {
		return await this.prismaService.$queryRawUnsafe(`SELECT * FROM Restaurant WHERE name LIKE '%${name}%';`);
	}

	public async deleteRestaurant(id: number): Promise<void> {
		const result = await this.prismaService.restaurant.deleteMany({
			where: { id: id }
		});

		if(result.count < 1) {
			throw new NotFoundException();
		}
	}

	public async editRestaurant(id: number, dto: EditRestaurantDto): Promise<void> {
		const result: RestaurantModel = await this.prismaService.restaurant.update({
			where: {id: id},
			data: {
				name: dto.name,
				email: dto.email,
				url: dto.url,
			}
		});

		if(!result) {
			throw new NotFoundException();
		}
	}

	public async addRestaurant(dto: AddRestaurantDto): Promise<number> {
		const result: RestaurantModel = await this.prismaService.restaurant.create({
			data: {
				name: dto.name,
				email: dto.email,
				url: dto.url,
			}
		});

		if(!result) {
			throw new NotFoundException();
		}

		return result.id;
	}
}
