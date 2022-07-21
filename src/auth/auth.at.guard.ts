import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./auth.public.decorator";

@Injectable()
export class AtGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if(this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) {
            return true;
        }
        
        const req = context.switchToHttp().getRequest();
        if(req.headers?.authorization === undefined) {
            throw new UnauthorizedException("Authorization token nie został podany (prawdopodobnie jesteś niezalogowany)");
        }

        return super.canActivate(context);
    }
}