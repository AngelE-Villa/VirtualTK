import axios from "axios";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
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
  createLibros(libro: LibrosModelo){
    return this.http.post(this.base_url+"book/", libro);
  }

  update(libros: LibrosModelo, id:String){
   return this.http.put(this.base_url+"book/"+id, libros);
  }

  delete(id:String){
    return this.http.delete(this.base_url+"book/"+id);
  }

}
