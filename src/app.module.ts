import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env'
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: +'${process.env.DATABASE_PORT}' || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'mi-123456',
        database: process.env.DATABASE_NAME || 'inventario_back_nest',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: false,
      }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
