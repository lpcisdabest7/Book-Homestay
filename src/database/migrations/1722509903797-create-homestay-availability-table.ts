import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHomestayAvailabilityTable1722509903797 implements MigrationInterface {
    name = 'CreateHomestayAvailabilityTable1722509903797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "homestay_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "availableFrom" date NOT NULL, "availableTo" date NOT NULL, "isBooking" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "homestayId" uuid, CONSTRAINT "PK_15a810d8db821d42f8adb455acf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "homestay_availability" ADD CONSTRAINT "FK_ac6562889ff94f1362e88535f53" FOREIGN KEY ("homestayId") REFERENCES "homestays"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homestay_availability" DROP CONSTRAINT "FK_ac6562889ff94f1362e88535f53"`);
        await queryRunner.query(`DROP TABLE "homestay_availability"`);
    }

}
