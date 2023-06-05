import { Roles } from '@decorators/auth/roles.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  CacheTTL,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MongoDBIDPipe } from '@pipes/mongo-id.pipe';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { Role } from '@shared/enums/role.enum';
import { Types } from 'mongoose';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';

@ApiTags('admin-posts')
@Controller('admin-posts')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createAdDto: CreateAdDto,

    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.adsService.create(createAdDto, image);
  }

  @CacheTTL(1)
  @ApiOkResponse({})
  @Get()
  findAll(@Query() filterQueryDto: FilterQueryDto) {
    return this.adsService.findAll(filterQueryDto);
  }

  @Delete(':adID')
  remove(@Param('adID', new MongoDBIDPipe()) adID: Types.ObjectId) {
    return this.adsService.remove(adID);
  }
}
