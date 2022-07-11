import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant as RestaurantModel } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AddRestaurantDto, EditRestaurantDto } from './admin.restaurants.dto';

@Injectable()
export class AdminRestaurantsService {
	constructor(private readonly prismaService: PrismaService) {}

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