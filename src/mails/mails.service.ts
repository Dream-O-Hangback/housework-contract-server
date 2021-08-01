import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import mailTemplate from '../mails/templates';
import { ConfigService } from '@nestjs/config';

const mailOption = {
    to: undefined,
    subject: undefined,
    html: undefined,
};

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    public async sendEmailCodeEmail(email: string, code: string, generateDate: Date): Promise<void> {
        mailOption.to = email;
        mailOption.subject = `[집안일 계약서] 인증코드 [${code}]를 입력해주세요!`;
        mailOption.html = mailTemplate.emailCode(code, generateDate, `${this.configService.get<string>('API_URL')}/accounts/email-notifications/disable?email=${email}`);

        return this.mailerService.sendMail(mailOption)
    }
}
