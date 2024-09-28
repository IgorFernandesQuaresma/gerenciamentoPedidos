import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './services/auth.service';
import { Bcrypt } from './bcrypt/bcrypt';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants/constants';
import { UsuarioService } from './usuario/service/usuario.service';


@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy, UsuarioService],
  controllers: [AuthController],
  exports: [Bcrypt],
})
export class AuthModule {}