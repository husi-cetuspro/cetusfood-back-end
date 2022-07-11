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