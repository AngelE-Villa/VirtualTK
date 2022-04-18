import {UsuarioModelo} from "./usuarioModelo";
import {LibrosModelo} from "./LibrosModelo";

export class solicitudModelo{
    comentario:any;
    estado:any;
    genero:any;
    usuario: UsuarioModelo= new UsuarioModelo();
    libro:LibrosModelo= new LibrosModelo();

}
