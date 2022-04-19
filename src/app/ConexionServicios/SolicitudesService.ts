import axios from "axios";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {SolicitudModelo, usuarioModelo} from "src/app/Modelos/SolicitudModelo"
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";


@Injectable({
  providedIn:"root"
})
export class SolicitudesService {
  base_url="https://appvirtualt-k.herokuapp.com/api/applications/";

  constructor(private http:HttpClient){

  }



  getSolicitudes():Observable<SolicitudModelo>{
    return this.http.get<SolicitudModelo>(this.base_url);
  }



  create(soli: SolicitudModelo):Boolean{

    this.http.post(this.base_url+"application/", soli).subscribe((reg)=> {
      console.log(reg)
      return true;
    })

    return false;
  }


  update(solicitud: SolicitudModelo, id:String):Boolean{
    if(this.http.put(this.base_url+"applications/"+id, solicitud)){
      return true;
    }else
    {
      return false;
    }
  }



  delete(id:String){
    return this.http.delete(this.base_url+"applications/"+id);
  }
}
