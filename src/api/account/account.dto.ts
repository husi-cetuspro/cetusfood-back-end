import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterAccountDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	confirmationPassword: string;
}

export class EditAccountDto {
	@ApiProperty({description: "Nowy email użytkownika"})
	email?: string;

	@ApiProperty({description: "Nowa rola użytkownika"})
	role?: string;

	@ApiProperty({description: "Zmiana hasła"})
	password?: string;
}