import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { EnderecoService } from "../service/endereco.service";
import { Endereco } from "../entities/endereco.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";



@ApiTags('Enderecos')
@UseGuards(JwtAuthGuard)
@Controller('/enderecos') 
@ApiBearerAuth()
export class EnderecoController {
    constructor (private readonly enderecoService: EnderecoService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Endereco[]> {
    return this.enderecoService.findAll();
}


@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() servico: Endereco): Promise<Endereco> {
    return this.enderecoService.create(servico); 
}

@Put()
@HttpCode(HttpStatus.CREATED)
update(@Body() servico: Endereco): Promise<Endereco> {
    return this.enderecoService.update(servico); 
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Endereco> {
    return this.enderecoService.findById(id);
}


@Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.enderecoService.delete(id);
  }

}


