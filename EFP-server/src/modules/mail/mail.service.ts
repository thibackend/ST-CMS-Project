import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendFaildCv(employeeEmail: string, employeeName: string) {
    await this.mailerService.sendMail({
      to: employeeEmail,
      subject: '[Exactly] Welcome to Our Team at Exactly',
      template: './assignMail.hbs',
      context: {
        name: employeeName,
      },
    });
  }

  async sendNewPassword(emailTo: string, username: string, email: string, password: string) {
    await this.mailerService.sendMail({
      to: emailTo,
      subject: '[Exactly] Welcome to Our Team at Exactly',
      template: 'newPassword.hbs',
      context: {
        username,
        email,
        newpassword:password
      },
    });
  }
}
