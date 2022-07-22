import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RegisterAccountDto } from '../account.dto';
import { SharedAccountService } from '../shared/shared.account.service';
import { Role } from 'src/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel } from '@prisma/client';

@Injectable()
export class PublicAccountService {
	constructor(private readonly prismaService: PrismaService, private readonly sharedAccountService: SharedAccountService) {}

	public async registerAccount(dto: RegisterAccountDto): Promise<number> {
		return this.sharedAccountService.registerAccount(dto, Role.USER);
	}

	public async verifyAccount(guid: string) {
		let account: AccountModel;
		try {
			account = await this.prismaService.account.findFirst({
				where: {
					isVerified: false,
					verificationCode: guid,
				}
			});
		} catch(err) {
			Logger.error(err);
			throw new NotFoundException("Nie znaleziono konta o podanym kodzie weryfikacyjnym");
		}

		await this.prismaService.account.update({
			where: {
				id: account.id
			},
			data: {
				isVerified: true,
			}
		});
	}

	public async changePassword(id: number, dto): Promise<void> {
		try {
			await this.prismaService.account.update({
				where: {
					id: id,
					// TODO: Security to not be able to change passwords on other accounts
				},
				data: {
					password: dto.password,
				}
			})
		} catch (error) {
			Logger.error(error);
			throw new NotFoundException("Nie można zmienić hasła");
		}
	}
}