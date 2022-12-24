import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/shared/decorators/auth/public.decorator';
import { CreateUserDto } from '../system-users/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully created, and can login now',
  })
  @ApiBadRequestResponse({ status: 400, description: 'If Email Exists.' })
  @Public()
  @Post('register')
  register(@Body() userCreateDto: CreateUserDto) {
    return this.authService.register(userCreateDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }
}
