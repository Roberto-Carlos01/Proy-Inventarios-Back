import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "../../producto/entities/producto.entity";
import { AlmacenProducto } from "./almacen_producto.entity";
import { Sucursal } from "../../sucursal/entities/sucursal.entity";

@Entity('almacenes')
export class Almacen {
        @PrimaryGeneratedColumn()
        id:number;

        @Column({length: 100})
        nombre:string;

        @Column({length: 100, nullable:true})
        codigo:string ;
        
        @Column({type: 'text', nullable:true})
        descripcion:string ;

        @ManyToOne(() => Sucursal, sucursal => sucursal.almacenes , {eager:true})
        sucursal: Sucursal;

        @OneToMany(() => AlmacenProducto, ap => ap.Almacen)
        productos: AlmacenProducto[];
}
