import { Injectable } from '@nestjs/common';
import { CreateClienteProveedorDto } from './dto/create-cliente-proveedor.dto';
import { UpdateClienteProveedorDto } from './dto/update-cliente-proveedor.dto';

@Injectable()
export class ClienteProveedorService {
  create(createClienteProveedorDto: CreateClienteProveedorDto) {
    return 'This action adds a new clienteProveedor';
  }

  findAll() {
    return `This action returns all clienteProveedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clienteProveedor`;
  }

  update(id: number, updateClienteProveedorDto: UpdateClienteProveedorDto) {
    return `This action updates a #${id} clienteProveedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} clienteProveedor`;
  }
}
