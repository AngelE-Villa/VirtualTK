import { Component, OnInit } from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";

@Component({
  selector: 'app-pagina-elementos',
  templateUrl: './pagina-elementos.component.html',
  styleUrls: ['./pagina-elementos.component.css']
})
export class PaginaElementosComponent implements OnInit {

  listaLibros: Array<any>=[];


  servicio:LibrosService;


  filtroListado:Array<any>=[];
  constructor(servicio:LibrosService) {
    this.servicio = servicio;

  }
  listadoLibrosfiltro = '';
  nocoindencias:boolean=false;

  ngOnInit(): void {
    this.servicio.getLibros().subscribe((x: any) => {
      this.listaLibros = x
    });

    }

}
