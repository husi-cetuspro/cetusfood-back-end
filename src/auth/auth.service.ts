import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express'
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}
	
	public async signIn(dto: SignInDto, res: Response): Promise<string> {
		Logger.log(`Użytkownik o mailu ${dto.email} próbuje się zalogować`);
		let acc = null;
		try {
			acc = await this.prismaService.account.findFirstOrThrow({
				where: {
					email: dto.email,
				}
			});
		} catch(ex) {
			throw new BadRequestException("Konto o takim emailu nie istnieje!");
		}
		
		if(!bcrypt.compareSync(dto.password, acc.password)) {
			throw new BadRequestException("Podane niepoprawne hasło");
		}

		if(!acc.isVerified) {
			throw new BadRequestException("Musisz potwierdzić maila");
		}

		if(!acc.isAccepted) {
			throw new BadRequestException("Twoje konto nie jest zatwierdzone przez admina");
		}
		
		const at = await this.getAccessToken(acc.id, acc.role);
		const rt = this.getRefreshToken();
		await this.updateAccountRefreshToken(rt, acc.id, acc.role);
		
		res.cookie("refreshToken", rt, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
		
		Logger.log(`Użytkownik o mailu ${dto.email} właśnie się zalogował`);
		
		return at;
	}

	public async logOut(refreshToken: string, res: Response) {
		try {
			await this.prismaService.userLogins.delete({
				where: {
					refreshToken: refreshToken,
				}
			});
			res.clearCookie("refreshToken");
		} catch(err) {
			throw new BadRequestException("Nie możesz się wylogować, bo nie jesteś zalogowany");
		}
	}

	public async refreshToken(refreshToken: string, res: Response): Promise<string> {
		try {
			const session = await this.prismaService.userLogins.findFirst({
				where: {
				    refreshToken: refreshToken,
				},
				select: {
				    accountId: true,
				    role: true,
				    refreshToken: true,
				}
			})
			const at = await this.getAccessToken(session.accountId, session.role);
			const newRt = this.getRefreshToken();

			await this.updateAccountRefreshToken(newRt, session.accountId, session.role, session.refreshToken);
			
			res.cookie("refreshToken", newRt, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

			return at;
		} catch(ex) {
		    throw new UnauthorizedException("Niepoprawny refresh token");
		}
	}
	
	private async getAccessToken(accId: number, role: string): Promise<string> {
		const jwtPayload: JwtPayload = {
		    accId: accId,
		    role: role
		}

		return await this.jwtService.signAsync(jwtPayload, {
			secret: this.configService.get<string>("AT_SECRET"),
			expiresIn: "24h",
		});
	}
	
	private getRefreshToken(): string {
		return randomBytes(64).toString('hex');
	}

	private async updateAccountRefreshToken(rt: string, accId: number, role: string, oldToken?: string) {
		const expirationDate: Date = new Date();
		expirationDate.setTime(expirationDate.getTime() + 60 * 24 * 60 * 60 * 1000);

		try {
			await this.prismaService.userLogins.update({
				where: {
					refreshToken: oldToken
				},
				data: {
					refreshToken: rt,
					expires: expirationDate
				},
			})
		} catch(ex) {
			await this.prismaService.userLogins.create({
				data: {
					refreshToken: rt,
					expires: expirationDate,
					role: role,
					accountId: accId,
				}
			})
		}
	}
	
	public async getRole(req: Request): Promise<string> {
		try {
			return req["user"].role;
		} catch {
			return "???";
		}
	}
}