import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddOrderDto {
    @ApiProperty({description: "ID Restauracji do której jest składane zamówienie"})
    @IsString()
    @IsNotEmpty()
    restaurantId: number;

    @ApiProperty({description: "Treść zamówienia"})
    @IsString()
    @IsNotEmpty()
    content: string;
}