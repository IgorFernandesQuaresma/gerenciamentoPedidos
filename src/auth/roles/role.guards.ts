import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsuarioService } from '../usuario/service/usuario.service';
import { CustomRequest } from './request.interface';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

  
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const user = request.user; // `user` deve estar definido e ser do tipo `Usuario`
    console.log('User:', user); // Verifique no console se `user` está definido e possui a propriedade roles
    return user && requiredRoles.some((role) => user.roles.includes(role));
  }
}

