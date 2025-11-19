import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/admin/roles/roles.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { InventarioModule } from './modules/admin/inventario/inventario.module';
import { NotaModule } from './modules/admin/nota/nota.module';
import { ClienteProveedorModule } from './modules/admin/cliente-proveedor/cliente-proveedor.module';
import { AuthModule } from './modules/auth/auth.module';

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
    UsersModule,
    RolesModule,
    PermissionsModule,
    InventarioModule,
    NotaModule,
    ClienteProveedorModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
