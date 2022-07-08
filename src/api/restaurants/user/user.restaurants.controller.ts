import { Param, Get, Controller, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserRestaurantsService } from './user.restaurants.service';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Restaurant as RestaurantModel } from '@prisma/client'
import { IsUserGuard } from 'src/auth/user.guard';

@UseGuards(IsUserGuard)
@ApiBearerAuth()
@Controller('user/restaurants')
@ApiTags('USER - restaurants')
export class UserRestaurantsController {
	constructor(private readonly restaurantService: UserRestaurantsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca liste wszystkich restauracji w bazie danych"})
	@ApiOkResponse({description: "Wszystkie restauracje w bazie danych", type: 'RestaurantModel', isArray: true})
	public async getAllRestaurants(): Promise<RestaurantModel[]> {
		return await this.restaurantService.getAllRestaurants();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca restauracje o podanym id, w przypadku niepoprawnego id zwraca blad 404"})
	@ApiOkResponse({description: "Restauracja o podanym id", type: 'RestaurantModel', isArray: false})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async getRestaurantById(@Param('id') id: string): Promise<RestaurantModel> {
		return await this.restaurantService.getRestaurantById(id);
	}

	@Get('/name/:name')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca restauracje pasujące do podanej nazwy"})
	@ApiOkResponse({description: "Restauracje pasujące do podanej nazwy", type: 'RestaurantModel', isArray: true})
	public async getRestaurantByName(@Param('name') name: string): Promise<RestaurantModel[]> {
		return await this.restaurantService.getRestaurantsByName(name);
	}
}