import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class IsAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const payload = req.user as JwtPayload;
        return payload?.role === 'admin';
    }
}