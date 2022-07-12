import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';
import { RegisterAccountDto } from '../account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAccountService implements OnModuleInit {
	constructor(private readonly prismaService: PrismaService) {}

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
		if(dto.password !== dto.confirmationPassword) {
			throw new BadRequestException("Pole confirmPassword nie jest równe polu password");
		}
		
		try {
			const accountExists: boolean = await this.prismaService.account.count({where: { email: dto.email }}) > 0;
			if(accountExists) {
				return;
			}

			const salt: string = bcrypt.genSaltSync(10);
			const hash: string = bcrypt.hashSync(dto.password, salt);
			
			const result: AccountModel = await this.prismaService.account.create({
				data: {
					email: dto.email,
					password: hash,
					role: "admin"
				}
			});

			return result.id;
		} catch(ex) {
			throw new InternalServerErrorException("Wystąpił problem podczas rejestrowania użytkownika");
		}
	}
}