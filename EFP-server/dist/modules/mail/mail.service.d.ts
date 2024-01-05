import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendFaildCv(employeeEmail: string, employeeName: string): Promise<void>;
    sendNewPassword(password: string): Promise<SentMessageInfo>;
}
