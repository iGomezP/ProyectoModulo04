import { Direccion } from './direccion.model';

export interface UsuarioModel {
  name: string;
  email: string;
  password: string;
  direccion: Direccion;
}
