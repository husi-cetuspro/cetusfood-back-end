import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { RegisterAccountDto } from "../account.dto";
import { Account as AccountModel } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "src/role.enum";
import { MailService } from "src/mail/mail.service"

@Injectable()
export class SharedAccountService {
    constructor(private readonly mailService: MailService, private readonly prismaService: PrismaService) {
    }

    public genHashPassword(pswd: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pswd, salt);
    }

    public async registerAccount(dto: RegisterAccountDto, role: Role, throwBadReqException: boolean = true) {
		if(dto.password !== dto.confirmationPassword) {
            if(throwBadReqException) {
                throw new BadRequestException("Pole confirmationPassword nie jest równe polu password");
            }

            return;
		}

		const accountExists: boolean = await this.prismaService.account.count({where: { email: dto.email }}) > 0;
		if(accountExists) {
            if(throwBadReqException) {
                throw new BadRequestException("Konto o takim mailu już istnieje");
            }
            return;
		}

		const result: AccountModel = await this.prismaService.account.create({
			data: {
				email: dto.email,
				password: this.genHashPassword(dto.password),
				role: role
			}
		});

        if(role === "user") {
            this.mailService.verifyUserAccount(dto.email);
        }
		
		Logger.log(`Konto o mailu ${dto.email} zostało właśnie zarejestrowane z rolą ${role}`);
		return result.id;
    }
}