import axios from "axios";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {UsuarioModelo, usuarioModelo} from "src/app/Modelos/usuarioModelo"

@Injectable({
  providedIn:"root"
})
export class UserService {
  base_url="https://appvirtualt-k.herokuapp.com/api/users/";

  constructor(private http:HttpClient){

  }


  //trae todos usuarios
  getUsuarios():Observable<usuarioModelo>{
    return this.http.get<usuarioModelo>(this.base_url);
  }

  url:String="";
//crear usuarios
  create(usuario: usuarioModelo):Boolean{
    console.log(usuario)
    this.url= this.base_url+"user";
    if(this.http.post(this.base_url+"user", usuario)){
      console.log(this.url + "   entra")

      return true;
    }else
    {
      return false;
    }
    //return this.http.post(this.base_url+"user/", usuario).then(res => res.data);
  }

  /*create(usuario:UsuarioModelo){
    return this.http.post(`${this.base_url}user`, {
      nombres: usuario.nombres,
      apellidos:usuario.apellidos
    }    )
  }*/

  update(usuario: usuarioModelo, id:String):Boolean{
    if(this.http.put(this.base_url+"user/"+id, usuario)){
      return true;
    }else
    {
      return false;
    }
  }

  delete(id:String){

    return this.http.delete(this.base_url+"user/"+id);
  }
}
