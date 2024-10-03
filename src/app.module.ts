import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './auth/usuario/usuario.module';
import { EnderecoModule } from './endereco/endereco.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	  useClass: DevService,
    imports: [ConfigModule],
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
