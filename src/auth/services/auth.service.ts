import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from '../usuario/service/usuario.service';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from '../bcrypt/bcrypt';



@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(username: string, password: string): Promise<any>{

        const buscarUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscarUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

            console.log('Senha armazenada (hash):', buscarUsuario.senha);
            console.log('Senha fornecida:', password);

        const matchPassword = await this.bcrypt.compararSenhas(buscarUsuario.senha, password)

        console.log(buscarUsuario.senha)
        console.log(matchPassword)

        
        if(buscarUsuario && matchPassword){
            const { senha, ...resposta } = buscarUsuario
            return resposta
        }

        return null
        
    }

    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario}

        const buscarUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        const retorno = {
            id: buscarUsuario.id,
            nome: buscarUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            roles: buscarUsuario.roles,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };

        return retorno;

    }
}