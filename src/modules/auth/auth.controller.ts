import { Public } from '@decorators/auth/public.decorator';
import { AccessTokenGuard } from '@guards/access-token.guard';
import { CreateAdminDto } from '@modules/system-users/admins/dto/create-admin.dto';
import { CreateUserDto } from '@modules/system-users/users/dto/create-user.dto';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { checkNullability } from '@shared/util/check-nullability.util';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from '@shared/interfaces/api/request.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'The Admin has been successfully created, and can login now',
  })
  @ApiBadRequestResponse({ status: 400, description: 'If Email Exists.' })
  @Public()
  @Post('register-admin')
  register(@Body() adminCreateDto: CreateAdminDto) {
    try {
      return this.authService.registerAdmin(adminCreateDto);
    } catch (error: any) {
      throw new HttpException(
        checkNullability(error.message)
          ? error.message
          : 'auth.errors.register',
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error as string),
        },
      );
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Logged in successfully, token is in the response json',
  })
  @Public()
  @Post('login-admin')
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    try {
      return this.authService.loginAdmin(loginAdminDto);
    } catch (error: any) {
      throw new HttpException(
        checkNullability(error.message) ? error.message : 'auth.errors.login',
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error as string),
        },
      );
    }
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully created',
  })
  @Public()
  @Post('register-user')
  registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.registerUser(createUserDto);
    } catch (error: any) {
      throw new HttpException(
        checkNullability(error.message)
          ? error.message
          : 'auth.errors.register',
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error as string),
        },
      );
    }
  }

  @ApiOkResponse({
    status: 200,
    description: 'Logged in successfully, token is in the response json',
  })
  @Public()
  @Post('login-user')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authService.loginUser(loginUserDto);
    } catch (error: any) {
      throw new HttpException(
        checkNullability(error.message) ? error.message : 'auth.errors.login',
        HttpStatus.AMBIGUOUS,
        {
          cause: new Error(error as string),
        },
      );
    }
  }

  // @UseGuards(RefreshTokenGuard)
  // @Get('refresh')
  // refreshTokens(@Req() req: Request) {
  //   const userId = req.user['sub'];
  //   const refreshToken = req.user['refreshToken'];
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }

  @UseGuards(AccessTokenGuard)
  @Get('logout-admin')
  logoutAdmin(@Req() req: Request) {
    this.authService.logoutAdmin(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout-user')
  logoutUser(@Req() req: Request) {
    this.authService.logoutUser(req.user['sub']);
  }
}
