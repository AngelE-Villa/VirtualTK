import {Component, Input, OnInit} from '@angular/core';
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import { Router} from "@angular/router";

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {


  mostrarUbicaciones:Boolean=false;
  servicio2:UbicacionService;
  ubicacionLista:Array<any>=[];
  ubicacionListaTitulo:Array<any>=[];
  reservacion: Array<any>=[];

  reserva:boolean=false;
  tabla:boolean=true;
  constructor(servicio2:UbicacionService, private router:Router) {
    this.servicio2=servicio2;

    this.servicio2.getUbicacion().subscribe((x:any)=>{
      this.ubicacionLista=x
    });
  }
  @Input()
  libro:LibrosModelo= new LibrosModelo();

  @Input()
  ubicacion:UbicacionModelo= new UbicacionModelo();

  ngOnInit(): void {
  }

  reservar( titulo:String, localizacion:String){
    this.reserva=true;
    this.tabla=false;
    for (let rs of this.ubicacionListaTitulo){
      if (rs.libro.titulo==titulo && rs.localizacion==localizacion){
        this.reservacion.push(rs);
      }else{
        console.log("No entra")
      }
    }

  }
  mostrar(titulo:String) {
    this.mostrarUbicaciones = !this.mostrarUbicaciones;
    for (let ub of this.ubicacionLista){
      if (ub.libro.titulo==titulo){
        this.ubicacionListaTitulo.push(ub);
      }else{
        console.log("No entra")
      }
    }

    for (let ubt of this.ubicacionListaTitulo){
      console.log("Titulo Ubi")
      console.log(ubt)
    }

  }
}
