import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-elementos',
  templateUrl: './pagina-elementos.component.html',
  styleUrls: ['./pagina-elementos.component.css']
})
export class PaginaElementosComponent implements OnInit {

  LibrosList: any[]=[];
  filas:any[];

  constructor() {
    this.filas=[
      {field:'nombre', header:'Nombre'},
      {field:'apellidos', header:'Apellido'},
      {field:'correo', header:'Correo'},
      {field:'fechaNaci', header:'Fecha Nacimiento'},
      {field:'opcionesCiudad', header: 'Ciudad de Residencia'},
      {field:'edad', header: 'Edad'}
    ]
  }

  ngOnInit(): void {

  }

}
