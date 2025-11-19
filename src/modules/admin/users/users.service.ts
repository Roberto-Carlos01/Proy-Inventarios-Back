import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const {name, email , password}=createUserDto;

    //verificamos si el usuario ya existe
    const existeUser= await this.userRepository.findOne({where: {name: name}});
    if(existeUser){
      throw new BadRequestException(`El usuario ${name} ya existe`);
    }
    return 'action';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  //para login
  async findOneByEmail(email: string){
    const user =await this.userRepository.findOneBy({email: email})
    if(!user){
      throw new NotFoundException("El usuario con Email: ${email} no existe");
    }else {
      return user;
    }
  }

}
