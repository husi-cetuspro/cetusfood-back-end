import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Restaurant } from './restaurant.entity';
export declare class RestaurantsService {
    private readonly repository;
    constructor(repository: Repository<Restaurant>);
    getAll(): Promise<Restaurant[]>;
    getById(id: number): Promise<Restaurant>;
    delete(id: number): Promise<DeleteResult>;
    edit(id: number, restaurant: Restaurant): Promise<UpdateResult>;
    add(restaurant: Restaurant): Promise<Restaurant>;
}
