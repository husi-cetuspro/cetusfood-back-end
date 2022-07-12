import { BadRequestException, NotFoundException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';
import { RegisterAccountDto } from '../account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAccountService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllAccounts(): Promise<AccountModel[]> {
		return await this.prismaService.account.findMany();
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
		if(dto.password !== dto.confirmationPassword) {
			throw new BadRequestException("Pole confirmPassword nie jest równe polu password");
		}

		try {
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
			throw new ForbiddenException("Konto o takim emailu już istnieje");
		}
	}
}