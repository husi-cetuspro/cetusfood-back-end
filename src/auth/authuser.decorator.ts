import { createParamDecorator, RequestTimeoutException } from "@nestjs/common";

export const AuthUser = createParamDecorator((data, req) => {
    return req.user;
});