import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    add(Order: Order): Promise<Order>;
}
