import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { Bcrypt } from '../bcrypt/bcrypt';
import { Endereco } from '../../endereco/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Endereco])], 
  providers: [Bcrypt, UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}