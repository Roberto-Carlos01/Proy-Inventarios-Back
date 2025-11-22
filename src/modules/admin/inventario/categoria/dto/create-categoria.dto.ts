import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {
        @MaxLength(100)
        @IsNotEmpty()
        @IsString()
        nombre: string;
    
        @IsOptional()
        @IsString()
        descripcion?:string;
}
