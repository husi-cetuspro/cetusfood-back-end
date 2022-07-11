import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterAccountDto } from '../account.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';

@Injectable()
export class PublicAccountService {
	constructor(private readonly prismaService: PrismaService) {}

	public async registerAccount(dto: RegisterAccountDto): Promise<number> {
		if(dto.password !== dto.confirmPassword) {
			throw new BadRequestException("Pole confirmPassword nie jest równe polu password");
		}

		try {
			const salt: string = bcrypt.genSaltSync(10);
			const hash: string = bcrypt.hashSync(dto.password, salt);
			const result: AccountModel = await this.prismaService.account.create({
				data: {
					email: dto.email,
					password: hash,
					role: "user"
				}
			});

			return result.id;
		} catch(ex) {
			throw new ForbiddenException("Konto o takim emailu już istnieje");
		}
	}
}