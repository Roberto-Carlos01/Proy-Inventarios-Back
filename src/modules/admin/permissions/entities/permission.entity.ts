import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    action:string; // create , update, read, delete

    @Column({nullable:true})
    subject:string; // (recurso) , user, role, categiria

    @Column({nullable:true})
    detalle:string;

    @ManyToMany(()=> Role, (rol)=> rol.permissions)
    roles: Role[]

}
