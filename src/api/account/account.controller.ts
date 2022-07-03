import { Get, Body, Controller, Post } from '@nestjs/common';
import { RegisterAccountDto } from './account.dto';
import { AccountService } from './account.service';
import { Account as AccountModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('account')
@ApiTags('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('/register')
	@ApiOperation({description: "Rejestruje uzytkownika"})
	@ApiOkResponse({description: "ID konta", type: 'integer'})
	public async registerAccount(@Body() dto: RegisterAccountDto): Promise<number> {
		return await this.accountService.registerAccount(dto);
	}

	@Get()
	@ApiOperation({description: "Zwraca wszystkie konta w bazie danych"})
	@ApiOkResponse({description: "Lista kont", type: 'AccountModel', isArray: true})
	public async getAllAccounts(): Promise<AccountModel[]> {
		return await this.accountService.getAllAccounts();
	}
}
