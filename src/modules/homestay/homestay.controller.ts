import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateHomestayDto } from './dto/homestay.create.dto';
import { HomeStayService } from './homestay.service';
import { HomeStayEntity } from './entity/homestay.entity';
import { UpdateHomestayDto } from './dto/homestay.update.dto';
import { QueryListHomestayDto } from './dto/homestay.query.dto';

@ApiTags('HomeStays')
@Controller({
  path: 'homestay',
  version: '1',
})
export class HomeStayController {
  constructor(private readonly homeStayService: HomeStayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateHomestayDto): Promise<HomeStayEntity> {
    return await this.homeStayService.create(dto);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.homeStayService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  get(@Query() query: QueryListHomestayDto) {
    return this.homeStayService.searchHomestays(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.homeStayService.getById(id);
  }

  @Patch('/:homestayId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('homestayId') homestayId: string,
    @Body() dto: UpdateHomestayDto,
  ): Promise<HomeStayEntity> {
    return await this.homeStayService.update(homestayId, dto);
  }

  @Delete('/:homestayId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('homestayId') homestayId: string) {
    await this.homeStayService.delete(homestayId);
  }
}
