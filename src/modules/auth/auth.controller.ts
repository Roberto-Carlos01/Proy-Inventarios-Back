import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { request } from 'http';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    @Post('/login')
    funLogin(@Body() datos: LoginAuthDto){
        return this.authService.login(datos)
    }


    //usamos el siguiente  decorador 
    @UseGuards(AuthGuard)
    //y el metodo get
    @Get('profile')
    //creamos la funcion pero no se para que sirve el decorador Request , que esta capturando
    funProfile(@Request() req){
        return req.user;
    }
}
