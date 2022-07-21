import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtPayload } from "./auth.jwt.payload";

@Injectable()
export class IsUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const payload = req.user as JwtPayload;
        return payload?.role === 'user' || payload?.role === 'admin';
    }
}