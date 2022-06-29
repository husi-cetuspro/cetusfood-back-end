import { Repository } from 'typeorm';
import { Order } from './orders.entity';
export declare class OrdersService {
    private readonly repository;
    constructor(repository: Repository<Order>);
    add(Order: Order): Promise<Order>;
}
