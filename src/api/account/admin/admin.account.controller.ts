import { Get, Body, Controller, Post, HttpCode, BadRequestException, HttpStatus, Req, Res, UseGuards, Delete, Param, Put, Logger, ParseIntPipe } from '@nestjs/common';
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
	public async getAccountById(@Param('id', ParseIntPipe) id: number) {
		return await this.accountService.getAccountById(id);
	}

	@Get('/email/:email')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca użytkownika o podanym mailu"})
	public async getAccountByEmail(@Param('email') email: string): Promise<AccountModel[]> {
		return await this.accountService.getAccountsByEmail(email);
	}

	@Get('isVerified')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca zweryfikowanych użytkowników"})
	public async getVerifiedUsers(): Promise<AccountModel[]> {
		return await this.accountService.getVerifiedUsers();
	}

	@Get('isAccepted')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca zaakceptowanych użytkowników"})
	public async getAcceptedUsers(): Promise<AccountModel[]> {
		return await this.accountService.getAcceptedUsers();
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Edytuje użytkownika o podanym id"})
	@ApiNotFoundResponse({description: "Serwer nie mógł znaleść użytkownika o podanym id"})
	public async editAccount(@Param('id', ParseIntPipe) id: number,@Body() dto: EditAccountDto) {
		return await this.accountService.editAccount(id, dto);
	}

	@Put('isAccepted/:id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Akceptacja użytkownika przez admina o podanym id"})
	@ApiNotFoundResponse({description: "Nie ma użytkownika o podanym id"})
	public async acceptUser(@Param('id', ParseIntPipe) id: number) {
		return await this.accountService.acceptUser(id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa użytkownika o podanym ID"})
	@ApiOkResponse({description: "Usunięto użytkownika"})
	public async deleteAccount(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return await this.accountService.deleteAccount(id);
	}
}