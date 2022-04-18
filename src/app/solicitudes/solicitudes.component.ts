import {Component, Input, OnInit} from '@angular/core';
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";

import Swal from "sweetalert2";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {


  post : any;
  titulosColumnas = ['Comentario',
  'Estado',
  'Genero',
  'Usuario',
  'Libro',
  'Editar',
  'Eliminar'];

 filas:Array<any>=[];

 tablaS:any;
  servicio:SolicitudesService;
  SolicitudesLista:Array<any>=[];
  comentarioU:any;
  estadoU:any;
  generoU:any;
  usuarioU: UsuarioModelo= new UsuarioModelo();
  libroU:LibrosModelo= new LibrosModelo();
  visibilidad:Boolean=false;
  visibilidadE:Boolean=false;
  filaNum:any;
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  constructor(servicio:SolicitudesService) {

    this.servicio=servicio;
    servicio.getSolicitudes().subscribe((x: any) => {
      this.SolicitudesLista = x
      this.filaNum=x.next();
      console.log(x)
    });


  }

  ngOnInit() {

  }


  editar(){
    this.visibilidad=true;

  }

  eliminar(){
  this.visibilidadE=true;
  }



  editarCorrecto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Registro Eliminado  ',
      showConfirmButton: false,
      timer: 1500
    })
    this.visibilidadE=false
  }


}


