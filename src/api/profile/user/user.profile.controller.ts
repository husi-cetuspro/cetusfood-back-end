import {Controller, Get, Query, Req, UseGuards} from "@nestjs/common";
import {IsUserGuard} from "../../../auth/user.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { Request} from "express";
import {SharedProfileService} from "../shared/shared.profile.service";

@Controller('user/profile')
@UseGuards(IsUserGuard)
@ApiBearerAuth()
@ApiTags('USER - profile')
export class UserProfileController{
    constructor(private readonly profileService: SharedProfileService) {
    }

    @Get('/me')
    public async me(@Req() req: Request, @Query("status") status?: string){
        return this.profileService.getUserProfile(req["user"].accId, status)
    }
}