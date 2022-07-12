import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';
import { RegisterAccountDto } from '../account.dto';
import { SharedAccountService } from '../shared/shared.account.service';
import { Role } from 'src/role.enum';

@Injectable()
export class AdminAccountService implements OnModuleInit {
	constructor(private readonly prismaService: PrismaService, private readonly sharedAccountService: SharedAccountService) {}

	onModuleInit() {
		this.registerAdminAccount({
			email: "admin@cetusfood.com",
			password: "admin123",
			confirmationPassword: "admin123",
		});
	}

	public async getAllAccounts(): Promise<AccountModel[]> {
		return await this.prismaService.account.findMany();
	}	
	
	public async registerAdminAccount(dto: RegisterAccountDto): Promise<number> {
		return await this.sharedAccountService.registerAccount(dto, Role.ADMIN, false);
	}
}