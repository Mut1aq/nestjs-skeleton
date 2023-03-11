import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admins')
@Controller('admins')
export class AdminController {}
