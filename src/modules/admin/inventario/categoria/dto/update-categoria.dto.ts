import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?:string;
}
