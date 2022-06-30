import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddRestaurantDto {
    @ApiProperty({description: "Nowa nazwa restauracji"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: "Nowy mail restauracji"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiPropertyOptional({description: "Nowy url strony restauracji"})
    @Optional()
    url: string
}

export class EditRestaurantDto {
    @ApiProperty({description: "Nowa nazwa restauracji"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: "Nowy mail restauracji"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiPropertyOptional({description: "Nowy url restauracji"})
    @Optional()
    url: string
}
