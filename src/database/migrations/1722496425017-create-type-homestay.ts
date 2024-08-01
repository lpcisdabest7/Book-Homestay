import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTypeHomestay1722496425017 implements MigrationInterface {
    name = 'CreateTypeHomestay1722496425017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "homestays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" jsonb NOT NULL, "name" text, "bedroomOption" integer, "bathroomOption" integer, "livingRoomOption" integer, "images" text, "description" text, "address" text, "latitude" real NOT NULL, "longitude" real NOT NULL, "maxGuest" integer NOT NULL, "geog" geometry(Point,3857), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_45f294901ecbc4f0664e75d2eb4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "homestays"`);
    }

}
