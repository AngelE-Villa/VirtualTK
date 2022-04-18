import {Component, Input, OnInit} from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {




  constructor( ) {

  }
  @Input()
  libro:LibrosModelo= new LibrosModelo();

  @Input()
  ubicacion:UbicacionModelo= new UbicacionModelo();

  ngOnInit(): void {
  }

}
