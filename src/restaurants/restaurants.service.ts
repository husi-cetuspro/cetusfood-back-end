import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Restaurant } from './restaurants.entity';

@Injectable()
export class RestaurantsService {
	constructor(@InjectRepository(Restaurant) private readonly repository: Repository<Restaurant>) {}

	public async getAll(): Promise<Restaurant[]> {
		return await this.repository.find();
	}

	public async getById(id: number): Promise<Restaurant> {
		return await this.repository.findOne({
			where: [ {id: id} ],
		});
	}

	public async delete(id: number): Promise<DeleteResult> {
		return await this.repository.delete(id);
	}

	public async edit(id: number, restaurant: Restaurant): Promise<UpdateResult> {
		return await this.repository.update(id, restaurant);
	}

	public async add(restaurant: Restaurant): Promise<Restaurant> {
		return this.repository.save(restaurant);
	}
}
