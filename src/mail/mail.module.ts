import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'serwer2142781.home.pl',
        port: 465,
        secure: true,
        auth: {
          user: 'cetusfood@erzeszowiak.pl',
          pass: '',
        },
      },
      defaults: {
        from: `"CetusFood" <${process.env.MAIL_NO_REPLY}>`,
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
