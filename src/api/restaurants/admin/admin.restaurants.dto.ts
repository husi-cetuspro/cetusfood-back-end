import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddRestaurantDto {
    @ApiProperty({description: "Nazwa restauracji"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: "Mail restauracji"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({description: "Url strony restauracji"})
    url?: string

    @ApiProperty({description: "Url loga restauracji"})
    logoUrl?: string
}

export class EditRestaurantDto {
    @ApiProperty({description: "Nowa nazwa restauracji"})
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiProperty({description: "Nowy mail restauracji"})
    @IsEmail()
    @IsNotEmpty()
    email?: string

    @ApiProperty({description: "Nowy url restauracji"})
    url?: string
    
    @ApiProperty({description: "Nowy url loga restauracji"})
    logoUrl?: string
}
