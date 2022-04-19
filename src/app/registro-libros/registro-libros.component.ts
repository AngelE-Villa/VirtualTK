import { Component, OnInit } from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-registro-libros',
  templateUrl: './registro-libros.component.html',
  styleUrls: ['./registro-libros.component.css']
})
export class RegistroLibrosComponent implements OnInit {

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

  constructor( servicio:LibrosService, servicioUb:UbicacionService) {
    this.servicio=servicio;
    this.servicioUb=servicioUb;
    this.servicio.getLibros().subscribe((x:any)=>{
      this.librosLista=x
      console.log(x)
      console.log("Primera Lista")
    })

  }

  ngOnInit(): void {
  }

  estado:boolean= true;


  Guardar(){
    this.servicio.getLibros().subscribe((x:any)=>{
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
    // @ts-ignore
    /*et clasificacion = document.getElementById("clasificacion").value;
    console.log(clasificacion, "clasificacion")
    console.log(this.clasificacionI)*/


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

    let ubi={
      "libro":libro,
      "localizacion":this.ubicacionI
    }
    console.log(this.tituloExist())
    if (this.tituloExist()==false){
      if(this.servicio.createLibros(libro)){
        console.log("creado")

      }else{
        console.log("error Crear")
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


    if (this.servicioUb.create(ubi)){
      console.log("creado Ubicacion");
    } else {
      console.log("error Ubi");
    }
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
