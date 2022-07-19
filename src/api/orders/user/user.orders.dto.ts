import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddOrderDto {
    @ApiProperty({description: "ID Restauracji do której jest składane zamówienie"})
    @IsNumber()
    restaurantId: number;

}

export class OrderItem {
    @ApiProperty({description: "ID Restauracji do której jest składane zamówienie"})
    @IsNumber()
    productId: number;
    count: number;
}