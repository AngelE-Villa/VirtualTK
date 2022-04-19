import {Component, Input, OnInit} from '@angular/core';
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

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

  reserva:boolean=false;
  tabla:boolean=true;

  router:Router;
  constructor(servicio2:UbicacionService, router:Router) {
    this.servicio2=servicio2;
    this.router=router;

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
  reservar( titulo:String, localizacion:String) {
    let name = localStorage.getItem('usu');
    console.log(name +"storage")
    if (name==null){
      this.error()
    }else {
      this.router.navigateByUrl(("Reservacion/" + localizacion + "/" + titulo));
    }

  }

  error(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error! ',
      text:' Necesita iniciar sesisón para reservar un articulo',
      showConfirmButton: true,

    })
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
