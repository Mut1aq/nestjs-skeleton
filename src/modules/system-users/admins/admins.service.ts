import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminDocument, Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ConfigService } from '@nestjs/config';
import { emptyDocument } from '@shared/error-handling/empty-document.helper';
import { checkNullability } from '@shared/util/check-nullability.util';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly configService: ConfigService,
  ) {}

  async findOneByEmail(email: string): Promise<AdminDocument> {
    let admin = await this.adminModel.findOne({ email });
    if (!admin)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.BAD_REQUEST,
      );

    return admin;
  }

  async findByID(AdminID: Types.ObjectId): Promise<AdminDocument | null> {
    const admin = (await this.adminModel.findById(AdminID)) as AdminDocument;
    emptyDocument(admin, 'admin');
    return admin;
  }

  findOneByProp(property: string, value: string) {
    return this.adminModel.findOne({ [property]: value });
  }

  async create(createAdminDto: CreateAdminDto) {
    const admin = new this.adminModel(createAdminDto);
    const salt = await bcrypt.genSalt(
      +(this.configService.get<number>('SALT_ROUNDS') as number),
    );
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();
  }

  async removeCityFromAdminAfterDelete(
    cityID: Types.ObjectId,
    adminID: Types.ObjectId,
  ) {
    return this.adminModel.updateOne(
      { _id: adminID },
      {
        $pull: {
          addedCities: cityID,
        },
      },
    );
  }

  async removeCategoryFromAdminAfterDelete(
    categoryID: Types.ObjectId,
    adminID: Types.ObjectId,
  ) {
    if (!checkNullability(categoryID)) return;
    return this.adminModel.updateOne(
      { _id: adminID },
      {
        $pull: {
          addedCategories: categoryID,
        },
      },
    );
  }

  async removeSubCategoryFromAdminAfterDelete(
    subCategoryID: Types.ObjectId,
    adminID: Types.ObjectId,
  ) {
    if (!checkNullability(subCategoryID)) return;
    return this.adminModel.updateOne(
      { _id: adminID },
      {
        $pull: {
          addedSubCategories: subCategoryID,
        },
      },
    );
  }

  async update(
    adminID: Types.ObjectId,
    updateAdminDto: UpdateAdminDto,
  ): Promise<AdminDocument | null> {
    return this.adminModel
      .findByIdAndUpdate(adminID, updateAdminDto, { new: true })
      .exec();
  }
}
