import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddOrderDto {
    @ApiProperty({description: "ID Restauracji do której jest składane zamówienie"})
    @IsNumber()
    restaurantId: number;

    @ApiProperty({description: "Treść zamówienia"})
    @IsString()
    @IsNotEmpty()
    content: string;
}