import { AdminsService } from '@modules/system-users/admins/admins.service';
import { CreateAdminDto } from '@modules/system-users/admins/dto/create-admin.dto';
import { CreateUserDto } from '@modules/system-users/users/dto/create-user.dto';
import { UsersService } from '@modules/system-users/users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@services/cache/cache.service';
import { UserType } from '@services/logger/logger.interface';
import { ServerAccessLogger } from '@services/logger/server-access.logger';
import { Role } from '@shared/enums/role.enum';
import { ReturnMessage } from '@shared/interfaces/general/return-message.interface';
import { checkObjectNullability } from '@shared/util/check-nullability.util';
import { Types } from 'mongoose';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { roleFinder } from '@shared/util/role-finder.util';
import { Admin } from '@modules/system-users/admins/interfaces/admin.interface';

@Injectable()
export class AuthService {
  constructor(
    // * Services
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly serverAccessLogger: ServerAccessLogger,
    private readonly cacheService: CacheService,
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
    accessToken: string;
  }> {
    const { password, credentials } = loginUserDto;
    const user = await this.validateUser(credentials, password);
    const userID = user._id.toString();
    const tokens = await this.generateTokens(userID, user.role);

    await this.cacheService.hset(
      userID,
      'accessToken',
      tokens?.accessToken,
      this.configService.get<number>('REDIS_EXPIRY_FOR_TOKEN')! * 1000,
    );

    this.serverAccessLogger.accessLog(
      credentials,
      'DEFAULT',
      userID,
      'LOGGED IN',
    );

    return {
      accessToken: tokens.accessToken,
    };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = loginAdminDto;

    const admin = await this.validateAdmin(email, password);

    const adminID = admin._id.toString();

    const tokens = await this.generateTokens(adminID, Role.ADMIN);

    await this.cacheService.hset(
      adminID,
      'accessToken',
      tokens?.accessToken,
      this.configService.get<number>('REDIS_EXPIRY_FOR_TOKEN')! * 1000,
    );

    this.serverAccessLogger.accessLog(email, 'ADMIN', adminID, 'LOGGED IN');

    return {
      accessToken: tokens.accessToken,
    };
  }

  async logoutAdmin(adminID: Types.ObjectId) {
    const admin = await this.adminsService.findByID(adminID);

    await this.cacheService.del(adminID.toString() + 'accessToken');

    this.serverAccessLogger.accessLog(
      admin?.email as string,
      'ADMIN',
      adminID,
      'LOGGED OUT',
    );
  }

  async logoutUser(userD: Types.ObjectId) {
    const user = await this.usersService.findByID(userD);
    let userType: UserType = roleFinder(user.role);

    await this.cacheService.del(userD.toString() + 'accessToken');
    this.serverAccessLogger.accessLog(
      user?.email,
      userType,
      userD,
      'LOGGED OUT',
    );
  }

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin: Admin = await this.adminsService.findOneByEmail(email);
    if (!checkObjectNullability(admin))
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

  async validateUser(credentials: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByCredentials(
      credentials,
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
