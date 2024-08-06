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
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class HomeStayService {
  constructor(
    private readonly homestayRepo: HomestayRepository,
    @InjectRepository(HomeStayEntity)
    private readonly homestayModel: Repository<HomeStayEntity>,

    @InjectRedis() private readonly clientRedis: Redis,
  ) {}

  async create(dto: CreateHomestayDto) {
    const entity = this.homestayModel.create(dto);
    return await this.homestayModel.save(entity);
  }

  async getAll() {
    let homestays = await this.getCachedHomestays('homestays');
    if (!homestays) {
      homestays = await this.homestayModel.find({
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
      await this.cacheHomestays('homestays', homestays);
    }
    return homestays;
  }

  async getById(homestayId_: string) {
    let inforHomestay = await this.getCachedHomestays(
      `homestayId_${homestayId_}`,
    );
    if (!inforHomestay) {
      inforHomestay = await this.homestayModel.findOneBy({ id: homestayId_ });
      if (!inforHomestay) {
        throw new NotFoundException(
          `HomestayId_ with id ${homestayId_} not found`,
        );
      }
      await this.cacheHomestays(`homestayId_${homestayId_}`, inforHomestay);
    }
    return inforHomestay;
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
    const { items, itemCount } = await this.homestayRepo.paginateGeoMeTries({
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

  async getCachedHomestays(cacheKey: string) {
    const cachedHomestays = await this.clientRedis.get(cacheKey);
    return cachedHomestays ? JSON.parse(cachedHomestays) : null;
  }

  async cacheHomestays(cacheKey: string, homestays: HomeStayEntity) {
    await this.clientRedis.set(cacheKey, JSON.stringify(homestays), 'EX', 3600);
  }
}
