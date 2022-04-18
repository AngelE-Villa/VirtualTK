import {Component, Input, OnInit} from '@angular/core';
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {solicitudModelo} from "../Modelos/SolicitudModelo";


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
  'Libro'];
 filas:Array<any>=[];
  servicio:SolicitudesService;
  SolicitudesLista:Array<any>=[];


  constructor(servicio:SolicitudesService) {

    this.servicio=servicio;
    servicio.getSolicitudes().subscribe((x: any) => {
      this.SolicitudesLista = x
      console.log(x)
    });

/*
    const soli={
      ...this.SolicitudesLista,
      usuario: this.SolicitudesLista
    }
    console.log(soli, "soli")*/
  }

  ngOnInit() {

  }


}


