import axios from "axios";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {usuarioModelo} from "src/app/Modelos/usuarioModelo"
import {LibrosModelo} from "../Modelos/LibrosModelo";

@Injectable({
  providedIn:"root"
})
export class LibrosService {
  base_url="https://appvirtualt-k.herokuapp.com/api/books/";

  constructor(private http:HttpClient){

  }

  //trae todos usuarios
  getLibros():Observable<LibrosModelo>{
    return this.http.get<LibrosModelo>(this.base_url);
  }

//crear usuarios
  createLibros(libro: LibrosModelo):Boolean{
    if(this.http.post(this.base_url+"books/", libro)){
      return true;
    }else
    {
      return false;
    }
    //return this.http.post(this.base_url+"user/", usuario).then(res => res.data);
  }

  update(libros: LibrosModelo, id:String):Boolean{
    if(this.http.put(this.base_url+"books/"+id, libros)){
      return true;
    }else
    {
      return false;
    }
  }

  delete(id:String){
    return this.http.delete(this.base_url+"books/"+id);
  }

}
