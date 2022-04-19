import { Component, OnInit } from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {UbicacionService} from "../ConexionServicios/UbicacionService";

@Component({
  selector: 'app-pagina-elementos',
  templateUrl: './pagina-elementos.component.html',
  styleUrls: ['./pagina-elementos.component.css']
})
export class PaginaElementosComponent implements OnInit {

  servicio:LibrosService;
  librosLista: Array<any>=[];
  libro:any;
  librosUbi: Array<any>=[]

  constructor(servicio:LibrosService) {
    this.servicio = servicio;


    servicio.getLibros().subscribe((x: any) => {
      this.librosLista = x
    });

  }

  ngOnInit(): void {

  }

}
