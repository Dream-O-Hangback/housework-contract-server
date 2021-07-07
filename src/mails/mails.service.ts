import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import mailTemplate from '../mails/templates';

const mailOption = {
  to: undefined,
  subject: undefined,
  html: undefined,
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
    this.mailerService = mailerService;
  }
  public async sendEmailCodeEmail({ email, code, generateDate }): Promise<void> {
    mailOption.to = email;
    mailOption.subject = `[집안일 계약서] 인증코드 [${code}]를 입력해주세요!`;
    mailOption.html = mailTemplate.emailCode({ code, generateDate });

    return this.mailerService.sendMail(mailOption)
  }
}
