import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { FilterUsersDto } from '../users/dto/filter-users.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SkipThrottle(true)
  async findUsers(@Query() filterUsersDto: FilterUsersDto) {
    return this.usersService.findAll(filterUsersDto);
  }

  @Get('count')
  countUsers() {
    return this.usersService.countAll();
  }
}
