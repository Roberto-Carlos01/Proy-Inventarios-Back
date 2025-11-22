import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventariosTables21763778568406 implements MigrationInterface {
    name = 'CreateInventariosTables21763778568406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD "sucursalId" integer`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_db5c778657f528e40a641d89c82" FOREIGN KEY ("sucursalId") REFERENCES "suscursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_db5c778657f528e40a641d89c82"`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP COLUMN "sucursalId"`);
    }

}
