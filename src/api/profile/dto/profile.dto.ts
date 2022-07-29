import {IsArray, IsNumber} from "class-validator";
import {Order} from "@prisma/client";

export class ProfileDto{
    @IsNumber()
    totalAmountToPay: number;

    @IsNumber()
    totalOrders: number;

    @IsArray()
    orders: Array<Order>
}