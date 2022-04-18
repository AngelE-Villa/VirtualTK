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
  ubicacionLista:Array<any>=[];
  libro:any;
  servicio2:UbicacionService;

  constructor( servicio:LibrosService, servicio2:UbicacionService) {
    this.servicio = servicio;
    this.servicio2=servicio2;

    servicio.getLibros().subscribe((x: any) => {
      this.librosLista = x

    });

    this.servicio2.getUbicacion().subscribe((x:any)=>{
      this.ubicacionLista=x
    });
  }

  ngOnInit(): void {

  }
  comparar(){
    for(let i=0; i<this.librosLista.length; i++){
      let recorre=this.librosLista[i];


    }
    this.librosLista
  }

}
