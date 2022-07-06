import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './account.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';

@Injectable()
export class AccountService {
	constructor(private readonly prismaService: PrismaService) {}

	// TODO: Send confirmation email
	public async registerAccount(dto: RegisterAccountDto): Promise<number> {
		const salt: string = bcrypt.genSaltSync(10);
		const hash: string = bcrypt.hashSync(dto.password, salt);
		const result: AccountModel = await this.prismaService.account.create({
			data: {
				email: dto.email,
				password: hash
			}
		});

		return result.id;
	}

	public async getAllAccounts(): Promise<AccountModel[]> {
		return await this.prismaService.account.findMany();
	}

	public async findAccountByEmail(email: string): Promise<AccountModel> {
		return await this.prismaService.account.findFirst({
			where: {
				email: email
			}
		});
	}
}
