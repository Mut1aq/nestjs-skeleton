import { MailsService } from '@modules/events/mails/mails.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSendOptions } from '@shared/enums/email-send-options.enum';
import { Role } from '@shared/enums/role.enum';
import { emptyDocument } from '@shared/error-handling/empty-document.helper';
import { Model, PopulateOptions, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../entities/user.entity';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersHelperService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,

    private readonly mailsService: MailsService,

    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new this.userModel(createUserDto);

    const salt = await bcrypt.genSalt(
      +this.configService.get<number>('SALT_ROUNDS')!,
    );
    user.password = await bcrypt.hash(user.password, salt);

    await Promise.all([
      user.save(),

      this.mailsService.welcomeToSkeleton(user.email, user.username),
    ]);
  }

  async findOneByCredentials(credentials: string): Promise<User> {
    let user = await this.userModel.findOne({
      $or: [
        {
          email: credentials,
        },
        {
          username: credentials,
        },
      ],
    });
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async findByID(userID: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById<User>(userID);
    emptyDocument(user, 'user');
    return user!;
  }

  async findByIDAndPopulate(
    userID: Types.ObjectId,
    populateOptions: PopulateOptions,
  ) {
    const user = await this.userModel
      .findById<User>(userID)
      .populate(populateOptions);
    emptyDocument(user, 'user');
    return user!;
  }

  async getEmails(emailSendOptions: EmailSendOptions) {
    let query = undefined;
    switch (emailSendOptions) {
      case EmailSendOptions.ALL:
        query = {};
        break;

      case EmailSendOptions.DEFAULT_USER:
        query = { role: Role.DEFAULT_USER };
        break;

      case EmailSendOptions.DOCTOR:
        query = { role: Role.DOCTOR };
        break;

      case EmailSendOptions.SERVICE_PROVIDER:
        query = { role: Role.SERVICE_PROVIDER };
        break;
    }

    const users = await this.userModel.find<User>(query as any);

    return users.map((user) => user.email);
  }

  async findOneByProp(
    property: string,
    value: string,
    _id: string,
  ): Promise<User> {
    const user = await this.userModel
      .findOne<User>({
        $and: [{ [property]: value }, { _id: new Types.ObjectId(_id) }],
      })
      .exec();
    return user!;
  }

  async findForRestPassword(value: string): Promise<User> {
    const user = await this.userModel
      .findOne<User>({
        $or: [
          {
            username: value,
          },
          {
            phoneNumber: value,
          },
        ],
      })
      .exec();
    emptyDocument(user, 'user');
    return user!;
  }
}
