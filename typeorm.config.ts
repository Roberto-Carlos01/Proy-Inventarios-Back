import { DataSource } from 'typeorm';
export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +`${process.env.DATABASE_PORT}` || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'mi-123456',
  database: process.env.DATABASE_NAME || 'inventario_back_nest',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
