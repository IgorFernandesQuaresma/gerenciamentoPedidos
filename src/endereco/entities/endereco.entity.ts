import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "../../auth/usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: "tb_enderecos"})
export class Endereco {
        @PrimaryGeneratedColumn()
        id:number;

        @IsNotEmpty()
        @ApiProperty()
        @Column({length: 100, nullable: false})
        Cep: string;

        @IsNotEmpty()
        @ApiProperty()
        @Column({length: 100, nullable: true})
        Rua: string;

        @IsNotEmpty()
        @ApiProperty()
        @Column({length: 100, nullable: false})
        Numero: string;

        @IsNotEmpty()
        @ApiProperty()
        @Column({length: 100, nullable: false})
        Bairro: string;

        @IsNotEmpty()
        @ApiProperty()
        @Column({length: 100, nullable: false})
        Cidade: string;

        @ApiProperty({ type: () => Usuario })
        @OneToOne(() => Usuario, (usuario) => usuario.endereco)
        usuario: Usuario;
}