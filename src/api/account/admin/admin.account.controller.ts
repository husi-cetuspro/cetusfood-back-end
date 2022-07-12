import { Get, Body, Controller, Post, HttpCode, BadRequestException, HttpStatus, Req, Res, UseGuards, Delete, Param } from '@nestjs/common';
import { Account as AccountModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/auth/admin.guard';
import { AdminAccountService } from './admin.account.service';

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

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Usuwa użytkownika o podanym ID"})
	@ApiOkResponse({description: "Usunięto użytkownika"})
	public async deleteAccount(@Param('id') id: string): Promise<void> {
		return await this.accountService.deleteAccount(parseInt(id));
	}
}
