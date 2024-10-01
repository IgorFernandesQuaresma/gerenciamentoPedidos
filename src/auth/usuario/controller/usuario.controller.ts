import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";





@Controller('/usuarios') 
export class UsuarioController {
    constructor (private readonly usuarioService: UsuarioService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario); 
}

@Post('usuario')
@HttpCode(HttpStatus.CREATED)
createUsuarioComEndereco(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.createUsuarioComEndereco(usuario); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario); 
}

}
