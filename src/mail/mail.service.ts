import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from './emailTemplates';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async remindUsersAboutOrder(
    userEmails: string[],
    userNames: string[],
    companyNames: string[],
  ) {
    let n = 0;
    userEmails.forEach((email) =>
      this.sendEmail(
        EmailTemplates.reminder,
        {
          reminder: {
            employee_name: userNames[n],
            company_name: companyNames[n],
          },
        },
        `Złóż zamówienie ${userNames[n++]}`,
        email,
      ),
    );
  }

  async verifyUserAccount(employeeName, companyName, userEmail) {
    this.sendEmail(
      EmailTemplates.verify,
      {
        verify: {
          employee_name: employeeName,
          company_name: companyName,
        },
      },
      `Weryfikacja użytkownika`,
      userEmail,
    );
  }

  async sendOrdersToRestaurant(
    companyName,
    ordersList: string[],
    restaruantEmail,
  ) {
    this.sendEmail(
      EmailTemplates.orders,
      {
        orders: {
          company_name: companyName,
          list_of_orders: ordersList,
        },
      },
      `Zamówienia z firmy ${companyName}`,
      restaruantEmail,
    );
  }

  @Cron('0 13 * * 1-5')
  triggerOrders() {
    const companyName = 'Cetuspro';
    const ordersList = ['Pizza', 'Spaghetti', 'Lasagne', 'Sałatka'];
    const restaruantEmail = 'maciejknowak5@gmail.com';
    this.sendOrdersToRestaurant(companyName, ordersList, restaruantEmail);
    return true;
  }

  triggerVerifyEmail() {
    const employeeName = 'Maciej Nowak';
    const companyName = 'Cetuspro';
    const userEmail = 'maciejknowak5@gmail.com';
    this.verifyUserAccount(employeeName, companyName, userEmail);
    return true;
  }

  @Cron('0 8 * * 1-5')
  triggerReminderEmail() {
    const userEmails = ['maciejknowak5@gmail.com'];
    const userNames = ['Maciej Nowak'];
    const companyNames = ['Cetuspro'];
    this.remindUsersAboutOrder(userEmails, userNames, companyNames);
    return true;
  }

  private async sendEmail(templateName, templateContext, subject, to) {
    try {
      await this.mailerService.sendMail({
        to,
        from: 'cetusfood@erzeszowiak.pl',
        subject,
        template: templateName,
        context: templateContext,
      });
    } catch (error) {
      throw error;
    }
    return true;
  }
}
