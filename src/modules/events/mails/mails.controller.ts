import { Roles } from '@decorators/auth/roles.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslationService } from '@services/translation.service';
import { Role } from '@shared/enums/role.enum';
import { CreateBulkMailDto } from './dto/create-bulk-mail.dto';
import { MailsService } from './mails.service';

@ApiTags('emails')
@Controller('mails')
export class MailsController {
  constructor(
    private readonly translationService: TranslationService,
    private readonly mailsService: MailsService,
  ) {}

  @Roles(Role.ADMIN)
  @Post('bulk')
  async sendBulkEmail(@Body() createBulkMailDto: CreateBulkMailDto) {
    try {
      return await this.mailsService.sendBulkEmail(createBulkMailDto);
    } catch (error) {
      return this.translationService.HTTPErrorTranslationWithTwoArgs(
        error,
        'shared.errors.create',
        'shared.entities.message',
      );
    }
  }
}
