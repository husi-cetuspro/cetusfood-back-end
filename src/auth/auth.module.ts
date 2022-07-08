import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AtStrategy } from './at.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({}), ],
    providers: [PrismaService, ConfigService, AuthService, AtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
