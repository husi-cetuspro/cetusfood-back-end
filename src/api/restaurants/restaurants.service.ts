import { Injectable } from '@nestjs/common';
import { Restaurant as RestaurantModel } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { AddRestaurantDto, EditRestaurantDto } from './restaurants.dto';

@Injectable()
export class RestaurantsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllRestaurants(): Promise<RestaurantModel[]> {
		return this.prismaService.restaurant.findMany();
	}

	public async getRestaurantById(id: number): Promise<RestaurantModel> {
		return this.prismaService.restaurant.findFirstOrThrow({
			where: { id: id }
		});
	}

	public async deleteRestaurant(id: number): Promise<void> {
		const result = this.prismaService.restaurant.delete({
			where: { id: id }
		});

		if(!result) {
			throw NotFoundError;
		}
	}

	public async editRestaurant(dto: EditRestaurantDto): Promise<void> {
		const result: RestaurantModel = await this.prismaService.restaurant.update({
			where: {id: dto.id},
			data: {
				name: dto.name,
				email: dto.mail,
				url: dto.url,
			}
		});

		if(!result) {
			throw NotFoundError;
		}
	}

	public async addRestaurant(dto: AddRestaurantDto): Promise<number> {
		const result: RestaurantModel = await this.prismaService.restaurant.create({
			data: {
				name: dto.name,
				email: dto.mail,
				url: dto.url,
			}
		});

		if(!result) {
			throw NotFoundError;
		}

		return result.id;
	}
}
