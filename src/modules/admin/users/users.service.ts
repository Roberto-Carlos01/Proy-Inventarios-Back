import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    //verificamos si el usuario ya existe
    const existeUser = await this.userRepository.findOne({
      where: { name: name },
    });
    if (existeUser) {
      throw new BadRequestException(`El usuario ${name} ya esta en uso`);
    }

    //verificamos si ya existe el email
    const existeEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    if (existeEmail) {
      throw new BadRequestException(`El email ${email} ya esta en uso`);
    }

    //encriptar la contraseña antes de guardar
    const hashPassword = await bcrypt.hash(createUserDto.password, 12);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...resto_datos } = newUser;
    return resto_datos;
  }

  async findAll(page: number = 1, limit: number = 10, search: string = '') {
    //paginacion
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.name LIKE :search OR user.email LIKE :search', {
        search: `%${search}%`,
      });
    queryBuilder.skip((page - 1) * limit).take(limit);
    const [users, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      total,
      page,
      totalPages,
      search,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id); // asumo que lanza si no existe

    // Separamos password del resto para no sobrescribir el password accidentalmente
    const { password, ...rest } = updateUserDto;

    // Actualizamos campos que no son la contraseña
    Object.assign(user, rest);

    // Si el DTO incluye password (y no está vacío), lo encriptamos y asignamos
    if (typeof password === 'string' && password.trim() !== '') {
      user.password = await bcrypt.hash(password, 12);
    }

    // Guardamos y esperamos el resultado
    const saved = await this.userRepository.save(user);

    // No devolvemos la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...datos } = saved;
    return datos;
  }

  async remove(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User con ID ${id} Not Found`);
    }

    return `This action removes a #${id} user`;
  }

  //para login
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('El usuario con Email: ${email} no existe');
    } else {
      return user;
    }
  }
}
