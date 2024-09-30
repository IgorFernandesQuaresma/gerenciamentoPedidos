import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "../../auth/usuario/entities/usuario.entity";



@Entity({name: "tb_enderecos"})
export class Endereco {
        @PrimaryGeneratedColumn()
        id:number;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        Cep: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: true})
        Rua: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        Numero: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        Bairro: string;

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        Cidade: string;

        @OneToOne(() => Usuario, (usuario) => usuario.endereco)
        usuario: Usuario;
}