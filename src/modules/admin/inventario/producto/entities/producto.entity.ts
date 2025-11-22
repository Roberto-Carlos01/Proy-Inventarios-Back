import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { AlmacenProducto } from "../../almacen/entities/almacen_producto.entity";

@Entity("productos")
export class Producto {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 200})
    nombre:string

    @Column({type: 'text', nullable:true})
    descripcion:string;

    @Column({length: 100, nullable:true})
    marca:string

    @Column({type: 'decimal', precision: 12, scale: 2})
    precios:number;

    @Column({length: 255})
    imagen: string;

    @Column()
    activo:boolean;

    @Column({type: 'date'})
    fecha_registro: Date;

    @ManyToOne(() => Categoria, categoria => categoria.prodcutos, {eager:true} )
    categoria: Categoria;

    @ManyToMany(() => AlmacenProducto, almacen => almacen.productos)
    almacenes: AlmacenProducto[]
}
