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
  createLibros(libro: LibrosModelo):Boolean{
    console.log(libro)

    this.http.post(this.base_url+"book/", libro).subscribe((reg)=> {
      console.log(reg)

    });

    return true;
    //return this.http.post(this.base_url+"user/", usuario).then(res => res.data);
  }

  update(libros: LibrosModelo, id:String):Boolean{
  this.http.put(this.base_url+"book/"+id, libros).subscribe((reg)=> {
    console.log(reg);
    });
    return true;
  }

  delete(id:String){
    return this.http.delete(this.base_url+"books/"+id);
  }

}
