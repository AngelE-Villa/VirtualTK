import { Component, OnInit } from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";

@Component({
  selector: 'app-registro-libros',
  templateUrl: './registro-libros.component.html',
  styleUrls: ['./registro-libros.component.css']
})
export class RegistroLibrosComponent implements OnInit {

  libro:LibrosModelo=new LibrosModelo();
  ubicacion:UbicacionModelo=new UbicacionModelo();
  idI:any;
  tituloI:any;
  autorI:any;
  editorialI:any;
  fechaPI:any;
  idiomaI:any;
  clasificacionI:any;
  ubicacionI:any;
  urlI:any;
  EstadoI:any;
  resumenI:any;

  nuevo=false;
  guarda=true;
  servicio:LibrosService;
  servicioUb:UbicacionService;
  librosLista: Array<any>=[];

  idL:any;
  titulo:any;
  editing:boolean=false;
  libros:Array<any>=[];

  idU:any;
  ubicaciones:Array<any>=[];

  idS:any;
  solicitudes:Array<any>=[];

  servicioSoli:SolicitudesService


  constructor( servicio:LibrosService, servicioUb:UbicacionService,route:ActivatedRoute,servicioSoli:SolicitudesService) {
    this.servicio=servicio;
    this.servicioUb=servicioUb;
    this.servicioSoli=servicioSoli;
    this.servicio.getLibros().subscribe((x:any)=>{
      this.librosLista=x
      console.log(x)
      console.log("Primera Lista")
    })
    this.titulo=route.snapshot.params['titulo'];

    if (this.titulo){
      this.editing=true;
      this.servicio.getLibros().subscribe((data:any)=>{
        this.libros=data;
          for (let lb of this.libros){
            this.idL=lb._id;
          }
        this.libros=this.libros.find((m)=>{return m.titulo==this.titulo});

      },(error)=> {
        console.log(error);
        }
      );

      this.servicioUb.getUbicacion().subscribe((data:any)=>{
          this.ubicaciones=data;

        this.ubicaciones=this.ubicaciones.find((m)=>{return m.libro.titulo==this.titulo});

        },(error)=> {
          console.log(error);
        }
      );

      this.servicioSoli.getSolicitudes().subscribe((data:any)=>{
          this.solicitudes=data;
        for (let lb of this.solicitudes){
          this.idS=lb._id;
        }
          this.solicitudes=this.solicitudes.find((m)=>{return m.libro.titulo==this.titulo});

        },(error)=> {
          console.log(error);
        }
      );
    }else {
      this.editing=false;
    }
    console.log("Inicio")
    console.log(this.editing)
  }

  ngOnInit(): void {
  }

  estado:boolean= true;


  Guardar(){
    console.log(this.editing)
    console.log(this.libros)
    console.log(this.ubicaciones)
    console.log(this.solicitudes)
    console.log(this.idL)
    console.log(this.idS)
    console.log(this.idU)
    /*this.servicio.getLibros().subscribe((x:any)=>{
      this.librosLista=x
      console.log(x)
      console.log("Nueva Lista")
    })

    if (this.EstadoI=="Disponible"){
      this.estado= true;
    }else
    {
      this.estado= false;
    }

    let libro={
      "titulo" : this.tituloI,
      "autores" : this.autorI,
      "editorial" : this.editorialI,
      "fecha_publicacion" :this.fechaPI,
      "idioma" : this.idiomaI,
      "clasificacion" : this.clasificacionI,
      "resumen" : this.resumenI,
      "link" : this.urlI,
      "estado" : this.estado
    }

    let libro1={
      "_id":this.idL,
      "titulo" : this.tituloI,
      "autores" : this.autorI,
      "editorial" : this.editorialI,
      "fecha_publicacion" :this.fechaPI,
      "idioma" : this.idiomaI,
      "clasificacion" : this.clasificacionI,
      "resumen" : this.resumenI,
      "link" : this.urlI,
      "estado" : this.estado
    }

    let ubi={
      "libro":libro,
      "localizacion":this.ubicacionI
    }
    console.log(this.tituloExist())

    if (this.editing){
      if(this.servicio.update(libro,"")){
        console.log("creado")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro creado correctamente!',
          showConfirmButton: false,
          timer: 1500})
      }
    }else {
      if (this.tituloExist()==false){

        if(this.servicio.createLibros(libro)){
          console.log("creado")
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro creado correctamente!',
            showConfirmButton: false,
            timer: 1500})
        }

      } else {
        console.log("Ya existe")
      }
    }

    if (this.editing){
      if (this.servicioUb.update(ubi,"")){
        console.log("creado Ubicacion");
      } else {
        console.log("error Ubi");
      }

    }else{
      if (this.servicioUb.create(ubi)){
        console.log("creado Ubicacion");
      } else {
        console.log("error Ubi");
      }
    }*/


    this.nuevo=true;
    this.guarda=false;


  }

  Reload(){
    window.location.reload();
  }

  // @ts-ignore
  tituloExist():boolean{
    let cont=0;
    for (let ll of this.librosLista){
      console.log(ll.titulo)
      console.log(this.tituloI)
      if (this.tituloI==ll.titulo){
        console.log("Entra en iguales")
        cont=1;
      }
      console.log(cont +"Numero titulo")
    }

    if (cont>0){
      return true;
    } else{
      return false;
    }
  }

}
