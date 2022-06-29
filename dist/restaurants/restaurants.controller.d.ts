import { DeleteResult, UpdateResult } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantsService);
    getAll(): Promise<Restaurant[]>;
    getById(id: number): Promise<Restaurant>;
    add(restaurant: Restaurant): Promise<Restaurant>;
    edit(id: number, restaurant: Restaurant): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
