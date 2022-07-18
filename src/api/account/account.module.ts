import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAccountController } from './admin/admin.account.controller';
import { AdminAccountService } from './admin/admin.account.service';
import { PublicAccountController } from './public/public.account.controller';
import { PublicAccountService } from './public/public.account.service';
import { SharedAccountService } from './shared/shared.account.service';

@Module({ 
  controllers: [PublicAccountController, AdminAccountController],
  providers: [SharedAccountService, MailService, PrismaService, PublicAccountService, AdminAccountService]
})
export class AccountModule {
}