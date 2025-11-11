import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { AlmacenModule } from './almacen/almacen.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [CategoriaModule, ProductoModule, AlmacenModule, SucursalModule]
})
export class InventarioModule {}
