import { Post, Param, Delete, Body, Put, Get, Controller } from '@nestjs/common';
import { AddRestaurantDto } from 'src/dtos/add-restaurant.dto';
import { EditRestaurantDto } from 'src/dtos/edit-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly service: RestaurantsService) {}

	@Get()
	public getAllRestaurants() {
		return this.service.getAllRestaurants();
	}

	@Put()
	public addRestaurant(@Body() dto: AddRestaurantDto) {
		return this.service.addRestaurant(dto);
	}

	@Delete(':id')
	public deleteRestaurant(@Param('id') id: string) {
		return this.service.deleteRestaurant(parseInt(id));
	}

	@Post()
	public editRestaurant(@Body() dto: EditRestaurantDto) {
		return this.service.editRestaurant(dto);
	}
}
