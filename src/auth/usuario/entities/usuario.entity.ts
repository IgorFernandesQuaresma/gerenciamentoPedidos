import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "../../roles/role.enum"


@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail({}, { message: 'O campo usuario deve ser um endereço de email válido.' })
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string

    @Column({
        type: 'enum', 
        enum: Role,    
        default: Role.User,
        array: true
})
roles: Role[];

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @Matches(/^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message: 'A senha deve conter pelo menos um caractere especial e uma letra minúscula.',
    })
    senha: string;

    @Column({ type: 'blob', nullable: true }) 
    foto: Buffer;
}