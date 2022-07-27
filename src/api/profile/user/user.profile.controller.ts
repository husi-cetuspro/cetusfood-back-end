import {Controller, Get, Query, Req, UseGuards} from "@nestjs/common";
import {IsUserGuard} from "../../../auth/user.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserProfileService} from "./user.profile.service";
import { Request} from "express";

@Controller('user/profile')
@UseGuards(IsUserGuard)
@ApiBearerAuth()
@ApiTags('USER - profile')
export class UserProfileController{
    constructor(private readonly profileService: UserProfileService) {
    }

    @Get('/me')
    public async me(@Req() req: Request, @Query("status") status?: string){
        return this.profileService.getUserProfile(req["user"].accId, status)
    }
}