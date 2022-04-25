import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {solicitudModelo} from "../Modelos/SolicitudModelo";
import {LibrosService} from "../ConexionServicios/LibrosService";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";

@Component({
  selector: 'app-eliminacion',
  templateUrl: './eliminacion.component.html',
  styleUrls: ['./eliminacion.component.css']
})
export class EliminacionComponent implements OnInit {
  libro:LibrosModelo=new LibrosModelo();
  ubicacion:UbicacionModelo=new UbicacionModelo();
  solicitud:solicitudModelo=new solicitudModelo();


  libros:Array<any>=[];
  ubicaciones:Array<any>=[];
  solicitudes:Array<any>=[];

  libroservicio:LibrosService;
  ubicacionServicio:UbicacionService;
  solicitudServicio:SolicitudesService;

  idL:any;
  idU:any;
  idS:any;

  titulo:any;
  local:any;
  router:Router
  constructor(router:Router,activedRoute:ActivatedRoute,  libroservicio:LibrosService,
              ubicacionServicio:UbicacionService,solicitudServicio:SolicitudesService) {
    this.libroservicio=libroservicio;
    this.ubicacionServicio=ubicacionServicio;
    this.solicitudServicio=solicitudServicio;
    this.router=router

    activedRoute.params.subscribe(param=>{
      this.titulo = param['titulo'];

      this.libroservicio.getLibros().subscribe((x:any)=>{
        this.libros=x;
        this.libro=this.libros.find((m)=>{return m.titulo==this.titulo});
        this.idL=this.libro._id;
      })
      this.ubicacionServicio.getUbicacion().subscribe((x:any)=> {
        this.ubicaciones= x;
        this.ubicacion=this.ubicaciones.find((m)=>{return m.libro.titulo==this.titulo});
        this.idU=this.ubicacion.id;
      });

      this.solicitudServicio.getSolicitudes().subscribe((x:any)=> {
        this.solicitudes= x;
        let cont=0;
        for (let sol of this.solicitudes){
          if (sol.libro.titulo==this.titulo){
            cont=1;
          }
        }
        if (cont==1) {
          this.solicitud = this.solicitudes.find((m) => {
            return m.libro.titulo == this.titulo
          });
          this.idS = this.solicitud._id;
        }
      });
    });
  }

  ngOnInit(): void {
  }

  correcto() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Eliminación completa',
      showConfirmButton: false,
      timer: 1500
    })
  }
  Cancelar(){
    this.router.navigateByUrl("/Listado")
  }

  TEliminaacion(){
    console.log(this.idL)
    console.log(this.idU)
    console.log(this.idS)
    console.log(this.libro)
    console.log(this.ubicacion)
    console.log(this.solicitud)
    if (this.idL!=null) {
      this.libroservicio.delete(this.idL).subscribe(res => {
        this.router.navigate(['/Listado'])
      })
    }
    if (this.idU!=null) {
      this.ubicacionServicio.delete(this.idU).subscribe(res => {
        this.router.navigate(['/Listado'])
      })
    }
    if (this.idS!=null){
      this.solicitudServicio.delete(this.idS).subscribe(res=>{
        this.router.navigate(['/Listado'])
      })
    }
    this.correcto()

  }
}
