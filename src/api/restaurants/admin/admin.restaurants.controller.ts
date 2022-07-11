
import { Post, Param, Delete, Body, Put, Get, Controller, UploadedFile, UseInterceptors, UploadedFiles, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminRestaurantsService } from './admin.restaurants.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { AddRestaurantDto, EditRestaurantDto } from './admin.restaurants.dto';
import { IsUserGuard } from 'src/auth/user.guard';

@UseGuards(IsUserGuard)
@ApiBearerAuth()
@Controller('admin/restaurants')
@ApiTags('USER - restaurants')
export class AdminRestaurantsController {
	constructor(private readonly restaurantService: AdminRestaurantsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({summary: "Dodaje restaurację do bazy danych"})
	@ApiCreatedResponse({description: "ID restauracji, ktora została dodana do bazy danych", type: 'integer', isArray: false})
	public async addRestaurant(@Body() dto: AddRestaurantDto): Promise<number> {
		return await this.restaurantService.addRestaurant(dto);
		
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Edytuje restaurację o podanym id"})
	@ApiOkResponse({description: 'Restauracja została pomyślnie zedytowana'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async editRestaurant(@Param('id') id: string, @Body() dto: EditRestaurantDto): Promise<void> {
		return await this.restaurantService.editRestaurant(parseInt(id), dto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa restaurację o podanym id"})
	@ApiOkResponse({description: 'Restauracja została pomyślnie usunięta'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async deleteRestaurant(@Param('id') id: string): Promise<void> {
		return await this.restaurantService.deleteRestaurant(parseInt(id));
	}
}