import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
	constructor(@InjectRepository(Restaurant) private readonly repository: Repository<Restaurant>) {}

	public async getAllRestaurants(): Promise<Restaurant[]> {
		return await this.repository.find();
	}

	public async getRestaurantById(id: number): Promise<Restaurant> {
		return await this.repository.findOne({
			where: [ {id: id} ],
		});
	}

	public async deleteRestaurant(id: number): Promise<DeleteResult> {
		return await this.repository.delete(id);
	}

	public async editRestaurant(id: number, restaurant: Restaurant): Promise<UpdateResult> {
		return await this.repository.update(id, restaurant);
	}

	// TODO: zwroc samo id
	public async addRestaurant(restaurant: Restaurant): Promise<Restaurant> {
		return this.repository.save(restaurant);
	}
}
