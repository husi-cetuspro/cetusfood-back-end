import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from '../shared/shared.account.dto';
import { SharedAccountService } from '../shared/shared.account.service';
import { Role } from 'src/role.enum';

@Injectable()
export class PublicAccountService {
	constructor(private readonly sharedAccountService: SharedAccountService) {}

	public async registerAccount(dto: RegisterAccountDto): Promise<number> {
		return this.sharedAccountService.registerAccount(dto, Role.USER);
	}
}