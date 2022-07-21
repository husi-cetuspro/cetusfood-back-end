import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddOrderDto {
    @ApiProperty({description: "ID Restauracji do której jest składane zamówienie"})
    @IsNumber()
    restId: number;

    items: Array<OrderItem>;
}

export class OrderItem {
    id: number;

    @IsNumber()
    count: number;
}