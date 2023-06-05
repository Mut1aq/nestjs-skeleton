import { Injectable, Inject, forwardRef, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FileUploadService } from '@services/file-upload/file-upload.service';
import { tags } from '@services/file-upload/interfaces/upload-options';
import { TimeoutSchedulingService } from '@services/task-scheduling/timeout-scheduling.service';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { ReturnMessage } from '@shared/interfaces/api/return-message.interface';
import { EmptyMongoQuery } from '@shared/interfaces/general/empty-mongodb-query.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { I18nTranslations } from 'generated/i18n.generated';
import { Model, Types } from 'mongoose';
import { I18nService } from 'nestjs-i18n';

import { adSelect } from './constants/db/ads-select-constants';
import { CreateAdDto } from './dto/create-ad.dto';
import { AdDocument } from './entities/ad.entity';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel('Ad') private readonly adModel: Model<AdDocument>,
    private readonly fileUploadService: FileUploadService,
    @Inject(forwardRef(() => TimeoutSchedulingService))
    private readonly timeoutSchedulingService: TimeoutSchedulingService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(
    createAdDto: CreateAdDto,
    image: Express.Multer.File,
  ): Promise<ReturnMessage> {
    const { expiry } = createAdDto;

    createAdDto.image = await this.fileUploadService.uploadFile(image, {
      allowedFormats: 'image',
      folder: 'Ads',
      resourceType: 'image',
      tags: tags.ad,
    });

    const ad = new this.adModel(createAdDto);

    const millisecondsBeforeDeleting =
      new Date(expiry).getTime() - new Date(Date.now()).getTime();

    this.timeoutSchedulingService.dynamicTimeoutAdDeletion(
      ad._id,
      millisecondsBeforeDeleting,
      createAdDto.expiry,
    );

    await ad.save();
    return {
      message: this.i18n.translate('shared.success.create', {
        args: {
          entity: this.i18n.translate('shared.entities.ad'),
        },
      }),
      statusCode: HttpStatus.CREATED,
    };
  }

  async findAll(filterQueryDto: FilterQueryDto) {
    const { skip, limit, orderByDate } = filterQueryDto;

    const orderByDateFilter: EmptyMongoQuery = checkNullability(orderByDate)
      ? { _id: orderByDate }
      : {};

    return this.adModel
      .find()
      .select(adSelect)
      .skip(skip || 0)
      .where({ isDeleted: false })
      .limit(
        limit ||
          parseInt(this.configService.get<string>('LIMIT_SIZE') as string),
      )
      .sort(orderByDateFilter)
      .exec();
  }

  async remove(adID: Types.ObjectId) {
    await this.adModel.findByIdAndRemove(adID);

    return {
      message: this.i18n.translate('shared.success.delete', {
        args: {
          entity: this.i18n.translate('shared.entities.ad'),
        },
      }),
      statusCode: HttpStatus.CREATED,
    };
  }
}
