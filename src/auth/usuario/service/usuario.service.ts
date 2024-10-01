import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../bcrypt/bcrypt";
import { Endereco } from "../../../endereco/entities/endereco.entity";



@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt,
        @InjectRepository(Endereco)
        private enderecoRepository: Repository<Endereco>,
        
    ){}


    async createUsuarioComEndereco(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findByUsuario(usuario.usuario);

        if (!buscarUsuario) {
            const novoUsuario = new Usuario();
            novoUsuario.nome = usuario.nome;
            novoUsuario.usuario = usuario.usuario;
            novoUsuario.tipo = usuario.tipo;
            novoUsuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
            
            const endereco = new Endereco();
            endereco.Cep = usuario.endereco.Cep;
            endereco.Rua = usuario.endereco.Rua;
            endereco.Numero = usuario.endereco.Numero;
            endereco.Bairro = usuario.endereco.Bairro;
            endereco.Cidade = usuario.endereco.Cidade;

            // Salvar o endereço primeiro
            await this.enderecoRepository.save(endereco);
            
            // Associar o endereço ao usuário
            usuario.endereco = endereco;

            // Salvar o usuário
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

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
                endereco: true
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

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }


    async update(usuario: Usuario): Promise<Usuario> {
        
        let usuarioBusca = await this.findById(usuario.id);

        if (!usuarioBusca || !usuario.id) {
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND); 
        }

        if (usuario.senha) {
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    }

        return await this.usuarioRepository.save(usuario);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let usuarioBusca = await this.findById(id);

        if (!usuarioBusca)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return await this.usuarioRepository.delete(id);

    }
}

