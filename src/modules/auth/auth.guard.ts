import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { jwtConstants } from "./constants";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean>{

        const request =context.switchToHttp().getRequest();
        // aqui manejamos el Bearer del TOKEN
        //en un array recibimos por separado al token y su tipo , separados gracias al split y si no existe el token se devuelve un array vacio
        const [type, token]=request.headers.authorization?.split(' ')??[];
        //verificamos si el token existe
        if(!token){
            //lo de aqui abajo no se que hace
            throw new UnauthorizedException;
        }
        //capturamos errores (no entiendo cada linea y parte del codigo)
        try{
            const payload=await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret})
            request['user']=payload;
        }catch(error){
            throw new UnauthorizedException;
        }
        return true;
    }
}