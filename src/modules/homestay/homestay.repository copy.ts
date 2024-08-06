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
      minPrice?: number;
      maxPrice?: number;
      maxGuest?: number;
      checkInDate?: Date;
      checkOutDate?: Date;
    };
    orderBy: Order;
    take: number;
    skip: number;
  }) {
    const srid = 3857;
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .from(HomeStayEntity, 'h')
      .select([
        'h.id AS id',
        'h.name AS name',
        'h.price AS price',
        'h.latitude AS latitude',
        'h.longitude AS longitude',
        'h.maxGuest AS maxGuest',
        `ST_Distance(
          ST_Transform(ST_SetSRID(ST_MakePoint(h.longitude, h.latitude), 4326), ${srid}),
          ST_Transform(ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), ${srid})
        ) as distance`,
      ])
      .leftJoin('bookings', 'b', 'h.id = b.homestayId')
      .where(
        `ST_DWithin(
          ST_Transform(ST_SetSRID(ST_MakePoint(h.longitude, h.latitude), 4326), ${srid}),
          ST_Transform(ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), ${srid}),
          :radius
        )`,
        {
          longitude: args.where.longitude,
          latitude: args.where.latitude,
          radius: args.where.radius,
        },
      );

    if (args.where.maxGuest !== undefined) {
      queryBuilder.andWhere('h.maxGuest >= :maxGuest', {
        maxGuest: args.where.maxGuest,
      });
    }

    if (args.where.checkInDate && args.where.checkOutDate) {
      queryBuilder.andWhere(
        `NOT EXISTS (
          SELECT 1
          FROM bookings b
          WHERE b.homestayId = h.id
            AND (
              (b.availableFrom <= :checkOutDate AND b.availableTo >= :checkInDate)
            )
        )`,
        {
          checkInDate: args.where.checkInDate,
          checkOutDate: args.where.checkOutDate,
        },
      );
    }

    if (
      args.where.minPrice !== undefined &&
      args.where.maxPrice !== undefined
    ) {
      queryBuilder.andWhere(
        "(h.price ->> 'amount')::numeric BETWEEN :minPrice AND :maxPrice",
        {
          minPrice: args.where.minPrice,
          maxPrice: args.where.maxPrice,
        },
      );
    } else if (args.where.minPrice !== undefined) {
      queryBuilder.andWhere("(h.price ->> 'amount')::numeric >= :minPrice", {
        minPrice: args.where.minPrice,
      });
    } else if (args.where.maxPrice !== undefined) {
      queryBuilder.andWhere("(h.price ->> 'amount')::numeric <= :maxPrice", {
        maxPrice: args.where.maxPrice,
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
