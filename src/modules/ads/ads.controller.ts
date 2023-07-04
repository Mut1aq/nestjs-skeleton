import { Roles } from '@decorators/auth/roles.decorator';
import { CacheTTL } from '@nestjs/cache-manager';
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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MongoDBIDPipe } from '@pipes/mongo-id.pipe';
import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
import { Role } from '@shared/enums/role.enum';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';

@ApiTags('admin-posts')
@Controller('admin-posts')
export class AdsController {
  constructor(private readonly adsService: AdsService) {} // todo: add try catch

  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createAdDto: CreateAdDto,

    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.adsService.create(createAdDto, image);
  }

  @CacheTTL(1)
  @ApiOkResponse({})
  @Get()
  async findAll(@Query() filterQueryDto: FilterQueryDto) {
    return await this.adsService.findAll(filterQueryDto);
  }

  @Delete(':adID')
  async remove(@Param('adID', new MongoDBIDPipe()) adID: string) {
    return await this.adsService.remove(adID);
  }
}
