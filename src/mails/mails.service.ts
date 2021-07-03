import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

const mailOption = {
  to: undefined,
  subject: undefined,
  template: undefined,
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
    this.mailerService = mailerService;
  }
  public sendEmailCodeEmail(email: string, name: string, nickname: string, code: string): void {
    mailOption.to = email;
    mailOption.subject = `[집안일 계약서] 인증코드 [${code}]를 입력해주세요!`;
    mailOption.template = undefined;

    this.mailerService
      .sendMail(mailOption)
      .then(() => {})
      .catch(() => {});
  }
}
