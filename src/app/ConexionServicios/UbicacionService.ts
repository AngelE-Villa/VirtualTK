import axios from "axios";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {UsuarioModelo, usuarioModelo} from "src/app/Modelos/usuarioModelo"
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";


@Injectable({
  providedIn:"root"
})
export class UbicacionService {
  base_url="https://appvirtualt-k.herokuapp.com/api/locations/";

  constructor(private http:HttpClient){

  }


  //trae todos usuarios
  getUbicacion():Observable<UbicacionModelo>{
    return this.http.get<usuarioModelo>(this.base_url);
  }

  url:String="";
//crear usuarios
  create(ubicacion: UbicacionModelo):Boolean{
    console.log(ubicacion)

    this.http.post(this.base_url+"location/", ubicacion).subscribe((reg)=> {
      console.log(reg)
      return true;
    })

    return false;
  }


  update(usuario: usuarioModelo, id:String):Boolean{
    if(this.http.put(this.base_url+"user/"+id, usuario)){
      return true;
    }else
    {
      return false;
    }
  }

  log(usuario: usuarioModelo, contraseña: String, usuario2:String ):Boolean{
    if(this.http.get(this.base_url, usuario)){
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
