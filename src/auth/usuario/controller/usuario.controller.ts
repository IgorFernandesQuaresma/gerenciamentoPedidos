import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";
import { RolesGuard } from "../../roles/role.guards";
import { Role } from "../../roles/role.enum";
import { Roles } from "../../roles/roles.decorator";




@Controller('/usuarios') 
@UseGuards(RolesGuard) 
export class UsuarioController {
    constructor (private readonly usuarioService: UsuarioService) { }

@Get()
@Roles(Role.Admin)
@HttpCode(HttpStatus.OK)
findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario); 
}

}
