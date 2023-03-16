import {
  Injectable,
  HttpException,
  HttpStatus,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ReturnMessage } from 'src/shared/interfaces/api/return-message.interface';
import { AdminsService } from '../system-users/admins/admins.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CreateUserDto } from '../system-users/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { checkObjectNullability } from 'src/shared/util/check-nullability.util';
import { CreateAdminDto } from '../system-users/admins/dto/create-admin.dto';
import { UsersService } from '../system-users/users/users.service';
import { User } from '../system-users/users/interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ServerAccessLogger } from 'src/services/logger/server-access.logger';
import { Role } from 'src/shared/enums/role.enum';
import { UserType } from 'src/services/logger/logger.interface';
import { Admin } from '../system-users/admins/interfaces/admin.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    // * Services
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly serverAccessLogger: ServerAccessLogger,
    @Inject(CACHE_MANAGER) private readonly redis: Cache,
  ) {}

  async registerAdmin(createAdminDto: CreateAdminDto): Promise<ReturnMessage> {
    await this.adminsService.create(createAdminDto);
    return { message: 'auth.success.register', statusCode: 201 };
  }

  async registerUser(createUserDto: CreateUserDto): Promise<ReturnMessage> {
    await this.usersService.create(createUserDto);
    return { message: 'auth.success.register', statusCode: 201 };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{
    accessToken: string | null | undefined;
  }> {
    const { password, username, email } = loginUserDto;
    const user = await this.validateUser(username, email, password);
    const userD = user._id.toString();
    const tokens = await this.generateTokens(userD);

    await this.redis.set(
      userD,
      tokens?.accessToken,
      this.configService.get<number>('REDIS_EXPIRY_FOR_TOKEN') as number,
    );

    this.serverAccessLogger.accessLog(email, 'DEFAULT', userD, 'LOGGED IN');

    return {
      accessToken: tokens.accessToken,
    };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
    accessToken: string | null | undefined;
  }> {
    const { email, password } = loginAdminDto;

    const admin = await this.validateAdmin(email, password);

    const adminID = admin._id.toString();

    const tokens = await this.generateTokens(adminID);

    await this.redis.set(
      adminID,
      tokens?.accessToken,
      this.configService.get<number>('REDIS_EXPIRY_FOR_TOKEN') as number,
    );

    this.serverAccessLogger.accessLog(email, 'ADMIN', adminID, 'LOGGED IN');

    return {
      accessToken: tokens.accessToken,
    };
  }

  async logoutAdmin(adminID: Types.ObjectId) {
    const admin = await this.adminsService.findByID(adminID);

    await this.redis.del(adminID.toString());

    this.serverAccessLogger.accessLog(
      admin?.email as string,
      'ADMIN',
      adminID,
      'LOGGED OUT',
    );
  }

  async logoutUser(userD: Types.ObjectId) {
    const user = await this.usersService.findByID(userD);
    let userType: UserType = 'DEFAULT';

    await this.redis.del(userD.toString());
    this.serverAccessLogger.accessLog(
      user?.email,
      userType,
      userD,
      'LOGGED OUT',
    );
  }

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin: Admin = await this.adminsService.findOneByEmail(email);
    if (checkObjectNullability(admin))
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, admin?.password);

    if (isMatch) {
      return admin;
    }
    throw new HttpException(
      'auth.errors.wrongEmailOrPassword',
      HttpStatus.BAD_REQUEST,
    );
  }

  async validateUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user: User = await this.usersService.findOneByCredentials(
      username,
      email,
    );
    if (!checkObjectNullability(user))
      throw new HttpException('auth.errors.wrongCred', HttpStatus.BAD_REQUEST);
    const isMatch = await bcrypt.compare(password, user?.password);

    if (isMatch) {
      return user;
    }
    throw new HttpException('auth.errors.wrongCred', HttpStatus.BAD_REQUEST);
  }

  async generateTokens(userD: Types.ObjectId, role?: Role) {
    const accessToken = this.jwtService.sign(
      {
        sub: userD,
        role,
      },
      {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'USER_ACCESS_TOKEN_EXPIRES_IN',
        ),
      },
    );

    return {
      accessToken,
    };
  }
}
