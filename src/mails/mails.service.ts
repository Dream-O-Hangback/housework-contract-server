import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import mailTemplate from '../mails/templates';
import 
MailCodeDto from './dto/mailCode.dto';

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
  public sendEmailCodeEmail(emailCodeDto: MailCodeDto): void {
    const { email, code } = emailCodeDto;
    mailOption.to = email;
    mailOption.subject = `[집안일 계약서] 인증코드 [${code}]를 입력해주세요!`;
    mailOption.template = mailTemplate.emailCode(emailCodeDto);

    this.mailerService
      .sendMail(mailOption)
      .then(() => {})
      .catch(() => {});
  }
}
