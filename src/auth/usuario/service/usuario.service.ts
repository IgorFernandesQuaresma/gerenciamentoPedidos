import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../bcrypt/bcrypt";



@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}


    async findByUsuario(usuarioname: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuarioname
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                agendamento: true,
                
            }
        });   
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findByUsuario(usuario.usuario);
    
        if (!buscarUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
            console.log('Senha criptografada para armazenamento:', usuario.senha); // Verifique se o hash está correto
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

    async findById(id: number): Promise<Usuario> {

        let servico = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                agendamento: true,
        
            }
            
        });

        if (!servico)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return servico;
    }


    async update(usuario: Usuario): Promise<Usuario> {
        
        let usuarioServico = await this.findById(usuario.id);

        if (!usuarioServico || !usuario.id)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.usuarioRepository.save(usuario);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let usuarioServico = await this.findById(id);

        if (!usuarioServico)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return await this.usuarioRepository.delete(id);

    }
}