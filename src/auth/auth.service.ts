import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
		const acc = await this.prismaService.account.findFirst({
			where: {
				email: dto.email,
			}
		});
		
		if(!acc) {
			throw new BadRequestException("Konto o takim emailu nie istnieje!");
		}
		
		if(!bcrypt.compareSync(dto.password, acc.password)) {
			throw new BadRequestException("Podane niepoprawne hasło");
		}
		
		const at = await this.getAccessToken(acc.id, acc.role);
		const rt = this.getRefreshToken();
		await this.updateAccountRefreshToken(rt, acc.id, acc.role);
		
		res["cookie"]("refreshToken", rt, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
		return at;
	}

	public async logOut(refreshToken: string) {
		try {
			await this.prismaService.userLogins.delete({
				where: {
					refreshToken: refreshToken,
				}
			})
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
            
			res["cookie"]("refreshToken", newRt, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
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
		const date = new Date();
		try {
			await this.prismaService.userLogins.update({
				where: {
					refreshToken: oldToken
				},
				data: {
					refreshToken: rt,
					expires: new Date(date.getDate() + 60).toISOString()
				},
			})
		} catch(ex) {
			await this.prismaService.userLogins.create({
				data: {
					refreshToken: rt,
					expires: new Date(date.getDate() + 60).toISOString(),
					role: role,
					accountId: accId,
				}
			})
		}
	}
}