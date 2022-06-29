import { Post, Param, Delete, Body, Put, Get, Controller } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Restaurant } from './restaurants.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@Get()
	public async getAll(): Promise<Restaurant[]> {
		return await this.restaurantService.getAll();
	}

	@Get(':id')
	public async getById(@Param('id') id: number): Promise<Restaurant> {
		return await this.restaurantService.getById(id);
	}

	@Put()
	public async add(@Body() restaurant: Restaurant): Promise<Restaurant> {
		return await this.restaurantService.add(restaurant);
	}

	@Post(':id')
	public async edit(@Param('id') id: number, @Body() restaurant: Restaurant): Promise<UpdateResult> {
		return await this.restaurantService.edit(id, restaurant);
	}

	@Delete(':id')
	public async delete(@Param('id') id: number): Promise<DeleteResult> {
		return await this.restaurantService.delete(id);
	}
}
