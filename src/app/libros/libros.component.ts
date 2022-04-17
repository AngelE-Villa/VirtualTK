import {Component, Input, OnInit} from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {LibrosModelo} from "../Modelos/LibrosModelo";

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

  ngOnInit(): void {
  }

}
