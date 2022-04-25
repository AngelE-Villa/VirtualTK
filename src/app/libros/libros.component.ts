import {Component, Input, OnInit} from '@angular/core';
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {LibrosService} from "../ConexionServicios/LibrosService";

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {


  servicioL:LibrosService;

  mostrarUbicaciones:Boolean=false;
  servicio2:UbicacionService;
  ubicacionLista:Array<any>=[];
  solicitudesLista:Array<any>=[];

  ubicacionListaTitulo:Array<any>=[];
  localizacion:boolean=true;
  soliService:SolicitudesService;

  tlibro:any;
  local:any;

  noUbicaciones:boolean=false;
  VentanaEditar:boolean=false;
  desabilitar:boolean=false;

  router:Router;
  constructor(servicio2:UbicacionService, router:Router, soliService:SolicitudesService,servicioL:LibrosService) {
    this.servicio2=servicio2;
    this.servicioL=servicioL
    this.soliService=soliService;
    this.router=router;

    this.soliService.getSolicitudes().subscribe((x:any)=>{
      this.solicitudesLista=x
    });

    this.servicio2.getUbicacion().subscribe((x:any)=>{
        this.ubicacionLista=x
    });

  }
  @Input()
  libro:LibrosModelo= new LibrosModelo();

  @Input()
  ubicacion:UbicacionModelo= new UbicacionModelo();

  ngOnInit(): void {
    let name = localStorage.getItem('usu');
    if(name=='admin'){
      this.desabilitar=true;
    }
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

  SeleccionLibro(titulo:String){
    this.VentanaEditar=true;
    console.log("Selecion")
  }

  Editar(){

  }

  mostrar(titulo:String) {
    this.mostrarUbicaciones = !this.mostrarUbicaciones;
    this.localizacion=false
    for (let soli of this.solicitudesLista){
      if (soli.libro.titulo==titulo){
        this.tlibro=soli.libro.titulo;
        this.local=soli.ubicacion;
      }
    }

    console.log(this.tlibro)
    console.log(this.local)

    for (let ub of this.ubicacionLista){
        if (this.local!=ub.localizacion && this.tlibro!=ub.localizacion && ub.libro.titulo==titulo){
          this.ubicacionListaTitulo.push(ub);
        }else{
          console.log("Libro pedido")
          console.log(ub.length)
        }
    }
    console.log(this.ubicacionListaTitulo.length)
    if (this.ubicacionListaTitulo.length<=0){
      this.noUbicaciones=true;
    }else {
      this.noUbicaciones=false;
    }

  }




}
