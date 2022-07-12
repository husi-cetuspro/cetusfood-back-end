import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "src/role.enum";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class IsUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const payload = req.user as JwtPayload;
        return payload?.role === Role.USER || payload?.role === Role.ADMIN;
    }
}