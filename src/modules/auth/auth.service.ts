import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async login(credenciales:LoginAuthDto){
        //capturando variables o datos
        const {email,password }= credenciales;
        //buscar usuario por email
        const user= await this.userService.findOneByEmail(email)
        if(!user){
            return new HttpException('Usuario no econtrado ',404);
        }
        //por falso verificar constraseña usando encriptacion y desencriptacion
        const verificarPass= user.password == password;
        if (!verificarPass){
            throw new HttpException('Contraseña Incorrecta',401);
        }

        //generar el JWT (instalar el JWT)
        const payload={email:email , id:user.id};
        const token= await this.jwtService.sign(payload);
        return {access_token:token ,user:user}
    }
}
