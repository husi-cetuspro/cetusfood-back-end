import { Post, Param, Delete, Body, Put, Get, Controller } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@Get()
	@ApiOperation({summary: "Zwraca liste wszystkich restauracji w bazie danych"})
	@ApiOkResponse({description: "Wszystkie restauracje w bazie danych", type: Restaurant, isArray: true})
	public async getAll(): Promise<Restaurant[]> {
		return await this.restaurantService.getAll();
	}

	@Get(':id')
	@ApiOperation({summary: "Zwraca restauracje o podanym id, w przypadku niepoprawnego id zwraca null"})
	@ApiOkResponse({description: "Restauracja o podanym id lub null", type: Restaurant, isArray: false})
	public async getById(@Param('id') id: number): Promise<Restaurant> {
		return await this.restaurantService.getById(id);
	}

	@Put()
	@ApiOperation({summary: "Dodaje restaurację do bazy danych"})
	@ApiOkResponse({description: "Obiekt, ktory został dodany do bazy danych", type: Restaurant, isArray: false})
	public async add(@Body() restaurant: Restaurant): Promise<Restaurant> {
		return await this.restaurantService.add(restaurant);
	}

	@Post(':id')
	@ApiOperation({summary: "Edytuje restaurację o podanym id"})
	@ApiOkResponse({schema: {
		type: 'object',
		properties: {
			affected: { type: 'number',  description: 'Liczba zedytowanych restauracji'},
		}
	}})
	public async edit(@Param('id') id: number, @Body() restaurant: Restaurant): Promise<UpdateResult> {
		return await this.restaurantService.edit(id, restaurant);
	}

	@Delete(':id')
	@ApiOperation({summary: "Usuwa restaurację o podanym id"})
	@ApiOkResponse({schema: {
		type: 'object',
		properties: {
			affected: { type: 'number',  description: 'Liczba usuniętych restauracji'},
		}
	}})
	public async delete(@Param('id') id: number): Promise<DeleteResult> {
		return await this.restaurantService.delete(id);
	}
}
