import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendFaildCv(employeeEmail: string, employeeName: string): Promise<void>;
    sendNewPassword(emailTo: string, username: string, email: string, password: string): Promise<void>;
}
