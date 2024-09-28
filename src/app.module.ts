import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoModule } from './endereco/servico.module';
import { Servico } from './endereco/entities/servico.entity';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { Agendamento } from './agendamento/entities/agendamento.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './auth/usuario/entities/usuario.entity';
import { UsuarioModule } from './auth/usuario/usuario.module';
import { RolesGuard } from './auth/roles/role.guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '16121995',
      database: 'db_agendamento',
      entities: [Servico, Agendamento, Usuario],
      synchronize: true,
    }),
    ServicoModule,
    AgendamentoModule,
    AuthModule,
    UsuarioModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    RolesGuard
  ],
})
export class AppModule {}
