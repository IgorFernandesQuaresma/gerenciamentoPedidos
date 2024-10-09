import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Endereco } from "../../../endereco/entities/endereco.entity"
import { ApiProperty } from "@nestjs/swagger"


@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail({}, { message: 'O campo usuario deve ser um endereço de email válido.' })
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false })
    usuario: string

    @IsNotEmpty()
    @ApiProperty() 
    @Column({ length: 50, default: 'user' }) // Define o tipo de usuário padrão como 'user'
    tipo: string;


    @MinLength(8)
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false }) 
    @Matches(/^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message: 'A senha deve conter pelo menos um caractere especial e uma letra minúscula.',
    })
    senha: string;

    @ApiProperty({ type: 'string', format: 'binary', nullable: true })
    @Column({ type: 'binary', nullable: true }) 
    foto: Buffer;

    @ApiProperty({ type: () => Endereco }) 
    @OneToOne(() => Endereco, (endereco) => endereco.usuario, { cascade: false })
    @JoinColumn()  
    endereco: Endereco;
}