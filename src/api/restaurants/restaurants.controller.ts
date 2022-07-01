import { Post, Param, Delete, Body, Put, Get, Controller, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { Restaurant as RestaurantModel } from '@prisma/client'
import { AddRestaurantDto, EditRestaurantDto } from './restaurants.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@Get()
	@ApiOperation({summary: "Zwraca liste wszystkich restauracji w bazie danych"})
	@ApiOkResponse({description: "Wszystkie restauracje w bazie danych", type: 'RestaurantModel', isArray: true})
	public async getAllRestaurants(): Promise<RestaurantModel[]> {
		return await this.restaurantService.getAllRestaurants();
	}

	@Get(':id')
	@ApiOperation({summary: "Zwraca restauracje o podanym id, w przypadku niepoprawnego id zwraca blad 404"})
	@ApiOkResponse({description: "Restauracja o podanym id", type: 'RestaurantModel', isArray: false})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async getRestaurantById(@Param('id') id: string): Promise<RestaurantModel> {
		return await this.restaurantService.getRestaurantById(id);
	}

	@Get('/name/:name')
	@ApiOperation({summary: "Zwraca restauracje o podanym id"})
	@ApiOkResponse({description: "Restauracje pasujace do podanej nazwy", type: 'RestaurantModel', isArray: true})
	public async getRestaurantByName(@Param('name') name: string): Promise<RestaurantModel[]> {
		return await this.restaurantService.getRestaurantsByName(name);
	}

	@Post()
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage(
			{

			}
		)
	
	}))
	@ApiOperation({summary: "Dodaje restaurację do bazy danych"})
	@ApiOkResponse({description: "ID restauracji, ktora została dodana do bazy danych", type: 'integer', isArray: false})
	public async addRestaurant(@Body() dto: AddRestaurantDto, @UploadedFile() file): Promise<number> {
		return await this.restaurantService.addRestaurant(dto);
		
	}

	@Put(':id')
	@ApiOperation({summary: "Edytuje restaurację o podanym id"})
	@ApiOkResponse({description: 'Restauracja została pomyślnie zedytowana'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async editRestaurant(@Param('id') id: string, @Body() dto: EditRestaurantDto): Promise<void> {
		return await this.restaurantService.editRestaurant(parseInt(id), dto);
	}

	@Delete(':id')
	@ApiOperation({summary: "Usuwa restaurację o podanym id"})
	@ApiOkResponse({description: 'Restauracja została pomyślnie usunięta'})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść restauracji o podanym id'})
	public async deleteRestaurant(@Param('id') id: string): Promise<void> {
		return await this.restaurantService.deleteRestaurant(parseInt(id));
	}
}