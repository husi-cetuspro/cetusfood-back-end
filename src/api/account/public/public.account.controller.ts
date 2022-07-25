import { Body, Controller, Post, HttpCode, HttpStatus, Param, Get, Logger, Put, ParseIntPipe } from '@nestjs/common';
import { EditAccountDto, RegisterAccountDto } from '../account.dto';
import { PublicAccountService } from './public.account.service';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('public/account')
@ApiTags('PUBLIC - account')
export class PublicAccountController {
	constructor(private readonly accountService: PublicAccountService) {}

	@Post('/register')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({summary: "Rejestruje użytkownika, pole confirmationPassword musi być równe polu password, w przeciwnym wypadku zwróci BadRequest (400)"})
	@ApiCreatedResponse({description: "ID konta", type: 'integer'})
	@ApiBadRequestResponse({description: "pole confirmationPassword nie jest równe polu password"})
	public async registerAccount(@Body() dto: RegisterAccountDto): Promise<number> {
		return await this.accountService.registerAccount(dto);
	}

	@Post('/verify/:guid')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Weryfikuje konto"})
	public async verifyAccount(@Param('guid') guid: string) {
		return await this.accountService.verifyAccount(guid);
	}

	@Put('/changePassword')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({summary: "Pozwala użytkownikowi zmienić hasło"})
	public async changePassword(@Param('id', ParseIntPipe) id: number, @Body() dto: EditAccountDto) {
		return await this.accountService.changePassword(id, dto);
	}
}