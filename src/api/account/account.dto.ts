import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterAccountDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
