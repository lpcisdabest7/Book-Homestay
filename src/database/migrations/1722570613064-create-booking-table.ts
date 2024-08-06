import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookingTable1722570613064 implements MigrationInterface {
  name = 'CreateBookingTable1722570613064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkIn" TIMESTAMP, "checkOut" TIMESTAMP, "availableFrom" date NOT NULL, "availableTo" date NOT NULL, "guestCount" integer NOT NULL, "totalPrice" jsonb, "status" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "homestayId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_0ba24b06875307376840868eee0" FOREIGN KEY ("homestayId") REFERENCES "homestays"("id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_0ba24b06875307376840868eee0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`,
    );
    await queryRunner.query(`DROP TABLE "bookings"`);
  }
}
