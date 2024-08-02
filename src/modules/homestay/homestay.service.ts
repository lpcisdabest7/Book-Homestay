import { Injectable, NotFoundException } from '@nestjs/common';
import { HomeStayEntity } from './entity/homestay.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assignIn } from 'lodash';
import { CreateHomestayDto } from './dto/homestay.create.dto';
import { UpdateHomestayDto } from './dto/homestay.update.dto';
import { QueryListHomestayDto } from './dto/homestay.query.dto';
import { HomestayRepository } from './homestay.repository';
import { PageMetaDto } from '../../../src/common/dto/page-meta.dto';

@Injectable()
export class HomeStayService {
  constructor(
    private readonly homestayRepo: HomestayRepository,
    @InjectRepository(HomeStayEntity)
    private readonly homestayModel: Repository<HomeStayEntity>,
  ) {}

  async create(dto: CreateHomestayDto) {
    const entity = this.homestayModel.create(dto);
    return await this.homestayModel.save(entity);
  }

  async getAll() {
    return await this.homestayModel.find({
      select: [
        'description',
        'images',
        'price',
        'address',
        'bedroomOption',
        'bathroomOption',
        'livingRoomOption',
        'maxGuest',
        'name',
      ],
    });
  }

  async update(
    homestayId: string,
    dto: UpdateHomestayDto,
  ): Promise<HomeStayEntity> {
    const homestay = await this.homestayModel.findOne({
      where: { id: homestayId },
    });
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }

    assignIn(homestay, dto);
    await this.homestayModel.save(homestay);

    return homestay;
  }

  async delete(homestayId: string) {
    return await this.homestayModel.delete({ id: homestayId });
  }

  async searchHomestays(query: QueryListHomestayDto) {
    const { items, itemCount } = await this.homestayRepo.paginate({
      where: {
        latitude: query.latitude,
        longitude: query.longitude,
        radius: query.radius,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        checkInDate: query.checkInDate,
        checkOutDate: query.checkOutDate,
        maxGuest: query.maxGuest !== undefined ? query.maxGuest : undefined,
      },
      skip: query.skip,
      take: query.take,
      orderBy: query.order,
    });

    const meta = new PageMetaDto({
      pageOptionsDto: {
        order: query.order,
        page: query.page,
        skip: query.skip,
        take: query.take,
      },
      itemCount,
    });

    return {
      meta,
      items,
    };
  }
}
