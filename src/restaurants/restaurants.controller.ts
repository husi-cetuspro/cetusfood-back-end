import { Body, Put, Get, Controller } from '@nestjs/common';
import { AddRestaurantDto } from 'src/dtos/add-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly service: RestaurantsService) {}

	@Get('/getAll')
	public getAllRestaurants() {
		return this.service.getAllRestaurants();
	}

	@Put('/add')
	public addRestaurant(@Body() dto: AddRestaurantDto) {
		return this.service.addRestaurant(dto);
	}
}
