import { Body, Controller, HttpCode, HttpStatus, Logger, Post, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

	@Post('refresh-token')
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Zwraca nowy refresh token"})
	@ApiOkResponse({description: "Refresh token", type: 'string'})
	public async refreshToken(@Req() req: Request, @Res({passthrough: true}) res: Response) {
		return this.authService.refreshToken(req["cookies"]["refreshToken"], res)
	}
	
	@Post('/logout')
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@ApiOperation({summary: "Wylogowuje użytkownika jeśli jest zalogowany"})
	@ApiOkResponse({description: "Użytkownik został wylogowany"})
	@ApiBadRequestResponse({description: "Użytkownik nie był zalogowany"})
	public async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
		return await this.authService.logOut(req["cookies"]["refreshToken"], res);	
	}

	@Post('/signin')
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Loguje użytkownika"})
	@ApiOkResponse({description: "Użytkownik został zalogowany"})
	@ApiBadRequestResponse({description: "Podano niepoprawne dane logowania"})
	public async signIn(@Body() dto: SignInDto, @Res({passthrough: true}) res: Response) {
		return await this.authService.signIn(dto, res);	
	}
}
