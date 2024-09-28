import { Request } from 'express';
import { Usuario } from '../usuario/entities/usuario.entity';


export interface CustomRequest extends Request {
  user?: Usuario;
}
