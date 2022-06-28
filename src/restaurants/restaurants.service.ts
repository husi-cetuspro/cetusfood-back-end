import { Injectable } from '@nestjs/common';
import { AddRestaurantDto } from 'src/dtos/add-restaurant.dto';
import { EditRestaurantDto } from 'src/dtos/edit-restaurant.dto';

// TODO: Implement SQLite database
let restaurants: object[] = [
	{id: 1, name: "Test", mail: "test@test.com", url: "test.com"},
	{id: 2, name: "Test2", mail: "test2@test2.com", url: "test2.com"},
];

@Injectable()
export class RestaurantsService {
	public getAllRestaurants(): object[]  {
		return restaurants;
	}

	public deleteRestaurant(id: number): object {
		restaurants = restaurants.filter(x => x["id"] !== id);
		return { message: "Pomyślnie usunięto restauracje" };
	}

	public editRestaurant(dto: EditRestaurantDto): object {
		let idx: number = restaurants.findIndex(x => x["id"] == dto.id);
		if(idx < 0)
			return { 
				success: false,
				message: `Restauracja o id '${dto.id}' nie istnieje`
			};
		
		let restaurant: object = {
			id: dto.id,
			name: dto.name,
			mail: dto.mail,
			url: dto.url,
		};

		restaurants[idx] = restaurant;

		return { 
			success: true,
			message: "Pomyślnie edytowano restauracje"
		};
	}

	public addRestaurant(dto: AddRestaurantDto): object {
		const id: number = restaurants[restaurants.length - 1]["id"]+1;
		restaurants.push({id: id, name: dto.name, mail: dto.mail, url: dto.url});
		return { message: "Pomyślnie dodano restauracje" };
	}
}
