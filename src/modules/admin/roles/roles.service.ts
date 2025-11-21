import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ){}



  create(createRoleDto: CreateRoleDto) {
    const {nombre, descripcion,permissionsIds}=createRoleDto;
    const role= this.roleRepository.create({
      name:nombre,
      description:descripcion
    })
    
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    const role= this.roleRepository.findOneBy({id: id})
    if(!role){
      throw new NotFoundException(`El role con id ${id} no existe`);
    }

    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
