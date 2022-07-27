import { Module } from '@nestjs/common';
import {UserProfileController} from "./user/user.profile.controller";
import {UserProfileService} from "./user/user.profile.service";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
    controllers: [UserProfileController],
    providers: [PrismaService ,UserProfileService]
})
export class ProfileModule {
}