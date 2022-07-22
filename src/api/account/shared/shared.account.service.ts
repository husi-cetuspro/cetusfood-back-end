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

    private genVerificationCode(): string {
        let d = new Date().getTime();
        let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }

            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
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

        const verificationCode: string = this.genVerificationCode();
		const result: AccountModel = await this.prismaService.account.create({
			data: {
				email: dto.email,
				password: this.genHashPassword(dto.password),
				role: role,
                verificationCode: verificationCode,
                isVerified: role === "admin",
                isAccepted: role === "admin",
			}
		});

        if(role === "user") {
            this.mailService.verifyUserAccount(dto.email, verificationCode);
        }

		Logger.log(`Konto o mailu ${dto.email} zostało właśnie zarejestrowane z rolą ${role}`);
		return result.id;
    }
}