import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { UsuarioService } from '../usuario/service/usuario.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // Busque o usuário no banco de dados com base no payload.sub
    const user = await this.usuarioService.findByUsuario(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    // Retorne o usuário completo para ser adicionado ao request
    return user;
  }
}