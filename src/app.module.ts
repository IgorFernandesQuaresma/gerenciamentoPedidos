import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './auth/usuario/entities/usuario.entity';
import { UsuarioModule } from './auth/usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Endereco } from './endereco/entities/endereco.entity';
import { EnderecoModule } from './endereco/endereco.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '16121995',
      database: 'db_gerenciamento',
      entities: [Usuario, Endereco],
      synchronize: true,
    }),
    EnderecoModule,
    AuthModule,
    UsuarioModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
