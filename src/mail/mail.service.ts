import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from './mail.templates.enum';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account as AccountModel, Order as OrderModel, Restaurant as RestaurantModel } from '@prisma/client'

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

  async verifyUserAccount(userEmail: string) {
    Logger.log(`Wysyłanie maila potwierdzającego do ${userEmail}`);

    this.sendEmail(
      EmailTemplates.verify,
      {},
      `Weryfikacja użytkownika`,
      userEmail,
    );
  }

  async sendOrdersToRestaurant(orders: OrderModel[], restaurant: RestaurantModel) {
    Logger.log(`Wysyłanie zamówień do ${restaurant.email} (${restaurant.name})`);

    const ordersContent = orders.map(order => order.content.split('|'));

    this.sendEmail(
      EmailTemplates.orders,
      {
        orders: {
          orders: ordersContent,
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
      const orders: OrderModel[] = await this.prismaService.order.findMany({
        where: {
          restaurantId: restaurant.id,
        }
      });

      this.sendOrdersToRestaurant(orders, restaurant);
    })
  }

  public async triggerVerifyEmail(accountId: number) {
    const account: AccountModel = await this.prismaService.account.findFirst({
      where: {
        id: accountId 
      }
    });

    this.verifyUserAccount(account.email);
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
