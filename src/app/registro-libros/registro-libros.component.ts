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

  servicio:LibrosService;
  servicioUb:UbicacionService;

  constructor( servicio:LibrosService, servicioUb:UbicacionService) {
    this.servicio=servicio;
    this.servicioUb=servicioUb;
    servicio.getLibros().subscribe((x:any)=>{
      console.log(x)
    })
  }

  ngOnInit(): void {
  }

  estado:boolean= true;

  Guardar(){

    if (this.EstadoI=="Disponible"){
      this.estado= true;
    }else
    {
      this.estado= false;
    }
    // @ts-ignore
    let clasificacion = document.getElementById("clasificacion").value;
    console.log(clasificacion, "clasificacion")
    console.log(this.clasificacionI)
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

    if(this.servicio.createLibros(libro)){
      console.log("creado")

    }else{
      console.log("error")
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro creado correctamente!',
        showConfirmButton: false,
        timer: 1500})
    }

    if (this.servicioUb.create(ubi)){
      console.log("creado Ubicacion");
    } else {
      console.log("error Ubi");
    }

  }

}
