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

  async sendNewPassword(password: string) {
    const status = await this.mailerService.sendMail({
      to: 'thi.a24technology@gmail.com',
      subject: 'Your new Password',
      template: 'newPassword.hbs',
      context: {
        password
      },
    });
    return status
  }
}
