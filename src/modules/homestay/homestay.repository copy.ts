import { Injectable } from '@nestjs/common';
import { Order } from '../../constants';
import { DataSource } from 'typeorm';
import { HomeStayEntity } from './entity/homestay.entity';

@Injectable()
export class HomestayRepository {
  constructor(private readonly dataSource: DataSource) {}

  async paginate(args: {
    where: {
      latitude: number;
      longitude: number;
      radius: number;
      maxGuest?: number;
    };
    orderBy: Order;
    take: number;
    skip: number;
  }) {
    const srid = 4326;
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .from(HomeStayEntity, 'h')
      .select([
        'h.id AS id',
        'h.name AS name',
        'h.latitude AS latitude',
        'h.longitude AS longitude',
        'h.maxGuest AS maxGuest',
        `ST_Distance(h.geog, ST_SetSRID(ST_MakePoint(:longitude, :latitude), :srid)) as distance`,
      ])
      .where(
        `ST_DWithin(h.geog, ST_SetSRID(ST_MakePoint(:longitude, :latitude), :srid), :radius)`,
        {
          longitude: args.where.longitude,
          latitude: args.where.latitude,
          radius: args.where.radius,
          srid,
        },
      );

    if (args.where.maxGuest !== undefined) {
      queryBuilder.andWhere('h.maxGuest >= :maxGuest', {
        maxGuest: args.where.maxGuest,
      });
    }

    const itemCount = await queryBuilder.clone().getCount();

    const items = await queryBuilder
      .limit(args.take)
      .offset(args.skip)
      .orderBy('distance', args.orderBy)
      .execute();

    return { itemCount, items };
  }
}
