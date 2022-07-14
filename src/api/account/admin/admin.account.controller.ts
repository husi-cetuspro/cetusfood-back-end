import { Get, Body, Controller, Post, HttpCode, BadRequestException, HttpStatus, Req, Res, UseGuards, Delete, Param, Put, Logger } from '@nestjs/common';
import { Account as AccountModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/auth/admin.guard';
import { AdminAccountService } from './admin.account.service';
import { EditAccountDto } from '../account.dto';

@Controller('admin/account')
@UseGuards(IsAdminGuard)
@ApiBearerAuth()
@ApiTags('ADMIN - account')
export class AdminAccountController {
	constructor(private readonly accountService: AdminAccountService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca wszystkie konta w bazie danych"})
	@ApiOkResponse({description: "Lista kont", type: 'AccountModel', isArray: true})
	public async getAllAccounts(): Promise<AccountModel[]> {
		return await this.accountService.getAllAccounts();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca użytkownika o podanym id"})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść użytkownika o podanym id'})
	public async getAccountById(@Param('id') id: string) {
		return await this.accountService.getAccountById(parseInt(id));
	}

	@Get('/email/:email')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca użytkownika o podanym mailu"})
	public async getAccountByEmail(@Param('email') email: string): Promise<AccountModel> {
		return await this.accountService.getAccountByEmail(email);
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Edytuje użytkownika o podanym id"})
	@ApiNotFoundResponse({description: 'Serwer nie mógł znaleść użytkownika o podanym id'})
	public async editAccount(@Param('id') id: string,@Body() dto: EditAccountDto) {
		return await this.accountService.editAccount(parseInt(id), dto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa użytkownika o podanym ID"})
	@ApiOkResponse({description: "Usunięto użytkownika"})
	public async deleteAccount(@Param('id') id: string): Promise<void> {
		return await this.accountService.deleteAccount(parseInt(id));
	}
}
