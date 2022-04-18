import { Component, OnInit } from '@angular/core';
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {


  post : any;
  titulosColumnas = ['comentario',
  'estado',
  'genero',
  'usuario',
  'libro'];
 filas:Array<any>=[];
  servicio:SolicitudesService;
  SolicitudesLista:Array<any>=[];


  constructor(servicio:SolicitudesService) {
    this.servicio=servicio;
    servicio.getSolicitudes().subscribe((x: any) => {
      this.SolicitudesLista = x

    });

    for(let i=0;i<this.SolicitudesLista.length; i++){
      this.filas=this.SolicitudesLista[i];
    }
    console.log(this.SolicitudesLista)
    const soli={
      ...this.SolicitudesLista,
      usuario: this.SolicitudesLista
    }
  }

  ngOnInit() {

  }


}
