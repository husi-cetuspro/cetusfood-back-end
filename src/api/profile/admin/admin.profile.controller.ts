import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Query, UseGuards} from "@nestjs/common";
import {IsAdminGuard} from "../../../auth/admin.guard";
import {SharedProfileService} from "../shared/shared.profile.service";
import {Status} from "../../../enums/status.enum";
import {ProfileDto} from "../dto/profile.dto";

@ApiBearerAuth()
@UseGuards(IsAdminGuard)
@Controller('admin/profile')
@ApiTags('ADMIN - profile')
export class AdminProfileController{
    constructor(private readonly profileService: SharedProfileService) {}

    @Get("/user/:id")
    public async getUserProfile(@Param("id") id: string, @Query("status") status: Status): Promise<ProfileDto>{
        return this.profileService.getUserProfile(id, status);
    }
}