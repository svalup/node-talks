import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMigration1652797920963 implements MigrationInterface {
  name = 'UsersMigration1652797920963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "providerId" character varying NOT NULL, "provider" character varying NOT NULL, "username" character varying NOT NULL, "token" character varying NOT NULL, "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
