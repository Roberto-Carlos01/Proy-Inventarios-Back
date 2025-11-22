import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventariosTables1763777886253 implements MigrationInterface {
    name = 'CreateInventariosTables1763777886253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" text, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying(200) NOT NULL, "descripcion" text, "marca" character varying(100), "precios" numeric(12,2) NOT NULL, "imagen" character varying(255) NOT NULL, "activo" boolean NOT NULL, "fecha_registro" date NOT NULL, "categoriaId" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AlmacenProducto" ("id" SERIAL NOT NULL, "cantidad_actual" integer NOT NULL, "fecha_actualizacion" date NOT NULL, "almacenId" integer, "productosId" integer, CONSTRAINT "PK_fbcb9867f1684d22f212d75b710" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacenes" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(100), "descripcion" text, "sucursalId" integer, CONSTRAINT "PK_2af9818dc2019bc97c7d26217e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suscursales" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(255) NOT NULL, "ciudad" character varying(100) NOT NULL, CONSTRAINT "PK_74c1f6d3827b3e33663ff1d62eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursales_user" ("id" SERIAL NOT NULL, "userId" uuid, "roleId" integer, CONSTRAINT "PK_d0d128cea01d84e89ebb07f8f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AlmacenProducto" ADD CONSTRAINT "FK_62e0defbdccad0166113d03abaa" FOREIGN KEY ("almacenId") REFERENCES "almacenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AlmacenProducto" ADD CONSTRAINT "FK_713eb50a3732610309c213db779" FOREIGN KEY ("productosId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacenes" ADD CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa" FOREIGN KEY ("sucursalId") REFERENCES "suscursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_9e5465e2e14ea19a6e0b198aff7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" ADD CONSTRAINT "FK_df200f824b784c6c08e5566050a" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_df200f824b784c6c08e5566050a"`);
        await queryRunner.query(`ALTER TABLE "sucursales_user" DROP CONSTRAINT "FK_9e5465e2e14ea19a6e0b198aff7"`);
        await queryRunner.query(`ALTER TABLE "almacenes" DROP CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa"`);
        await queryRunner.query(`ALTER TABLE "AlmacenProducto" DROP CONSTRAINT "FK_713eb50a3732610309c213db779"`);
        await queryRunner.query(`ALTER TABLE "AlmacenProducto" DROP CONSTRAINT "FK_62e0defbdccad0166113d03abaa"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`DROP TABLE "sucursales_user"`);
        await queryRunner.query(`DROP TABLE "suscursales"`);
        await queryRunner.query(`DROP TABLE "almacenes"`);
        await queryRunner.query(`DROP TABLE "AlmacenProducto"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
