import { Injectable } from '@nestjs/common';
import { AddRestaurantDto } from 'src/dtos/add-restaurant.dto';

// TODO: Implement SQLite database
let restaurants: object[] = [
	{name: "Test", mail: "test@test.com", url: "test.com"},
	{name: "Test2", mail: "test2@test2.com", url: "test2.com"},
];

@Injectable()
export class RestaurantsService {
	public getAllRestaurants(): object[]  {
		return restaurants;
	}

	public addRestaurant(dto: AddRestaurantDto): object {
		console.log(dto);
		restaurants.push({name: dto.name, mail: dto.mail, url: dto.url});
		return { message: "Pomyślnie dodano restauracje" };
	}
}
