import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {
  local:String="";
  titulo:String="";
  reservacion: Array<any>=[];
  reservacionFil: Array<any>=[];
  constructor(activedRoute: ActivatedRoute, ubicaService:UbicacionService) {
    activedRoute.params.subscribe(param=>{
      this.local= param['localizacion'];
      this.titulo = param['titulo'];
      console.log(this.local)
      console.log(this.titulo)
      ubicaService.getUbicacion().subscribe((x:any)=> {
        this.reservacion = x;
        //console.log(this.reservacion)
        for (let ub of this.reservacion){
          if (ub.libro.titulo==this.titulo && ub.localizacion==this.local){
            this.reservacionFil.push(ub);
            console.log(ub)
          }else{
            console.log("No entra")
          }
        }

      });
    });

  }

  ngOnInit(): void {
  }
/*
  reservar(){
    console.log("Entra")
    console.log(this.reservacion.length)
    for (let rs of this.reservacion){
      if (rs.libro.titulo==this.titulo && rs.localizacion==this.local){
        this.reservacionFil.push(rs);
      }else{
        console.log("No entra")
      }
    }
    console.log(this.reservacionFil.length)
     for (let rs of this.reservacionFil){
       console.log(rs)
     }
  }*/

}
