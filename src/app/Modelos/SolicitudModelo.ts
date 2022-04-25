import {UsuarioModelo} from "./usuarioModelo";
import {LibrosModelo} from "./LibrosModelo";

export class solicitudModelo{
    _id:any;
    comentario:any;
    estado:any;
    genero:any;
    user: UsuarioModelo= new UsuarioModelo();
    libro:LibrosModelo= new LibrosModelo();
    ubicacion:any;

}
