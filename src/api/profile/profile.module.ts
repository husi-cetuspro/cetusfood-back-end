import { Module } from '@nestjs/common';
import {UserProfileController} from "./user/user.profile.controller";
import {PrismaService} from "../../prisma/prisma.service";
import {AdminProfileController} from "./admin/admin.profile.controller";
import {SharedProfileService} from "./shared/shared.profile.service";

@Module({
    controllers: [UserProfileController, AdminProfileController],
    providers: [PrismaService, SharedProfileService]
})
export class ProfileModule {
}