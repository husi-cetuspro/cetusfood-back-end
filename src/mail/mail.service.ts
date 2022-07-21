import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from './mail.templates.enum';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel, Order as OrderModel, OrderItem, Product, Restaurant as RestaurantModel } from '@prisma/client'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly prismaService: PrismaService) {}

  @Cron('0 8 * * 1-5')
  async remindUsersAboutOrder() {
    const accounts: AccountModel[] = await this.prismaService.account.findMany();
    accounts.forEach(acc => {
      Logger.log(`Wysyłanie przypomnienia o złożeniu zamówienia do ${acc.email}`);
      this.sendEmail(
        EmailTemplates.reminder,
        {},
        "Przypomnienie o złożeniu zamówienia",
        acc.email
      );
    }); 
  }

  async verifyUserAccount(userEmail: string, verificationCode) {
    Logger.log(`Wysyłanie maila potwierdzającego do ${userEmail}`);

    this.sendEmail(
      EmailTemplates.verify,
      {
        verify: {
          code: verificationCode
        }
      },
      `Weryfikacja użytkownika`,
      userEmail,
    );
  }

  async sendOrdersToRestaurant(items: OrderItem[], restaurant: RestaurantModel) {
    Logger.log(`Wysyłanie zamówień do ${restaurant.email} (${restaurant.name})`);

    this.sendEmail(
      EmailTemplates.orders,
      {
        orders: {
          items: items,
          restaurant: restaurant,
        },
      },
      'Zamówienie',
      restaurant.email
    );
  }

  @Cron('0 13 * * 1-5')
  private async triggerOrders() {
    const restaurants: RestaurantModel[] = await this.prismaService.restaurant.findMany();
    restaurants.forEach(async (restaurant) => {
      const items = []; // TODO:
      
      this.sendOrdersToRestaurant(items, restaurant);
    })
  }

  private async sendEmail(templateName: EmailTemplates, templateContext: any, subject: string, to: string) {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: process.env.MAIL_FROM,
        subject: subject,
        template: templateName,
        context: templateContext,
      });
    } catch(error) {
      Logger.error(error);
    }
  }
}