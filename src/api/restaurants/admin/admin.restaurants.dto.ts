import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl} from "class-validator";

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
    @IsOptional()
    @IsUrl()
    url?: string

    @ApiProperty({description: "Url loga restauracji"})
    @IsOptional()
    @IsUrl()
    logoUrl?: string
}

export class EditRestaurantDto {
    @ApiProperty({description: "Nowa nazwa restauracji"})
    name?: string;

    @ApiProperty({description: "Nowy mail restauracji"})
    email?: string

    @ApiProperty({description: "Nowy url restauracji"})
    @IsOptional()
    @IsUrl()
    url?: string
    
    @ApiProperty({description: "Nowy url loga restauracji"})
    @IsOptional()
    @IsUrl()
    logoUrl?: string
}

export class AddProduct {
    @ApiProperty({description: "Nazwa Produktu"})
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiProperty({description: "Cena Produktu"})
    price?: number
    
    @ApiProperty({description: "URL Obrazka Produktu"})
    @IsString()
    @IsNotEmpty()
    logoUrl?: string

    @ApiProperty({description: "ID Restauracji w ktorej znajduje sie produkt"})
    restaurantID?: number
}


export class EditProduct {
    @ApiProperty({description: "Nazwa Produktu"})
    @IsString()
    name?: string;

    @ApiProperty({description: "Cena Produktu"})
    @IsNumber()
    price?: number
    
    @ApiProperty({description: "URL Obrazka Produktu"})
    @IsString()
    logoUrl?: string

    @ApiProperty({description: "ID Restauracji w ktorej znajduje sie produkt"})
    restaurantID: number
}
