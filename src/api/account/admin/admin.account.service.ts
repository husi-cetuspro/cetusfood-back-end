import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';
import { RegisterAccountDto, EditAccountDto } from '../account.dto';
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

	public async getAccountById(id: number) {
		const acc = await this.prismaService.account.findFirst({
			where: { id: id }
		});

		if(!acc){
			throw new NotFoundException('Nie znaleziono konta o podanym id');
		}

		return acc;
	}

	public async getAccountByEmail(email: string): Promise<AccountModel> {
		return await this.prismaService.account.findFirst({
			where: { email: email }
		});
	}

	public async editAccount(id: number, dto: EditAccountDto): Promise<void> {
		try {
			const result: AccountModel = await this.prismaService.account.update({
				where: { id: id},
				data: {
					email: dto.email,
					role: dto.role,
				}
			});

			this.prismaService.userLogins.deleteMany({
				where: { 
					accountId: id
				}
			});
		} catch (error) {
			Logger.error(error)
			throw new NotFoundException('Nie znaleziono konta o podanym id')
		}
	}
	
	public async deleteAccount(id: number): Promise<void> {
		const result = await this.prismaService.account.deleteMany({
			where: { id: id }
		});

		if(result.count < 1) {
			throw new NotFoundException(`Nie znaleziono użytkowmnika o podanym id (${id})`);
		}
	}


	public async registerAdminAccount(dto: RegisterAccountDto): Promise<number> {
		return await this.sharedAccountService.registerAccount(dto, Role.ADMIN, false);
	}
}