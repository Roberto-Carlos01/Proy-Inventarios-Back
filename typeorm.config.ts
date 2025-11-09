import { DataSource } from "typeorm";
export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '123456',
    database:'biblioteca_db',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts']
})