import {UsuarioModelo} from "./usuarioModelo";
import {LibrosModelo} from "./LibrosModelo";

export class solicitudModelo{
    comentario:any;
    estado:any;
    genero:any;
    user: UsuarioModelo= new UsuarioModelo();
    libro:LibrosModelo= new LibrosModelo();
    ubicacion:any;

}
