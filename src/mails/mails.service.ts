import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import mailTemplate from '../mails/templates';
import 
MailCodeDto from './dto/mailCode.dto';

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
  public async sendEmailCodeEmail(mailCodeDto: MailCodeDto): Promise<void> {
    const { email, code } = mailCodeDto;
    mailOption.to = email;
    mailOption.subject = `[집안일 계약서] 인증코드 [${code}]를 입력해주세요!`;
    mailOption.html = mailTemplate.emailCode(mailCodeDto);

    return this.mailerService.sendMail(mailOption)
  }
}
