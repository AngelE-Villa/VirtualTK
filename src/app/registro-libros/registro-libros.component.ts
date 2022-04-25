import { Component, OnInit } from '@angular/core';
import {LibrosService} from "../ConexionServicios/LibrosService";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {solicitudModelo} from "../Modelos/SolicitudModelo";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-registro-libros',
  templateUrl: './registro-libros.component.html',
  styleUrls: ['./registro-libros.component.css']
})
export class RegistroLibrosComponent implements OnInit {

  libro:LibrosModelo=new LibrosModelo();
  ubicacion:UbicacionModelo=new UbicacionModelo();
  solicitud:solicitudModelo=new solicitudModelo();


  nuevo=false;
  guarda=true;

  //Servicios
  servicioLi:LibrosService;
  servicioUb:UbicacionService;
  servicioSoli:SolicitudesService

  //Listas
  librosLista: Array<LibrosModelo>=[];
  ubicacionesLista: Array<any>=[];
  solicitudesLista: Array<any>=[];

  //IDs
  idL:any;
  idU:any;
  idS:any;

  //Parametro
  titulo:any;

  //Editar o Crear
  editing:boolean=false;

  libros:Array<any>=[];
  ubicaciones:Array<any>=[];
  solicitudes:Array<any>=[];


  router:Router

  pipe = new DatePipe('en-US');


  constructor( servicioLi:LibrosService, servicioUb:UbicacionService,router:Router,route:ActivatedRoute,servicioSoli:SolicitudesService) {
    this.servicioLi=servicioLi;
    this.servicioUb=servicioUb;
    this.router=router;
    this.servicioSoli=servicioSoli;
    this.servicioLi.getLibros().subscribe((x:any)=>{
      this.librosLista=x
        for (let lg of this.librosLista){
          lg.fecha_publicacion= this.pipe.transform(lg.fecha_publicacion, 'yyyy-MM-dd');
        }
      console.log(x)
    })
    this.servicioUb.getUbicacion().subscribe((x:any)=>{
      this.ubicacionesLista=x
    })
    this.servicioSoli.getSolicitudes().subscribe((x:any)=>{
      this.solicitudesLista=x
    })

    this.titulo=route.snapshot.params['titulo'];

    if (this.titulo){
      this.editing=true;
      this.servicioLi.getLibros().subscribe((data:any)=>{
        this.libros=data;
        this.libro=this.libros.find((m)=>{return m.titulo==this.titulo});
          this.idL=this.libro._id;
          if (this.libro.estado==true){
            this.libro.estado="Disponible"
          }else {
            this.libro.estado="No Disponible"
          }
          if (this.libro.fecha_publicacion!=null){
            this.libro.fecha_publicacion= this.pipe.transform(this.libro.fecha_publicacion, 'yyyy-MM-dd');
            console.log(this.libro.fecha_publicacion)
          }


      },(error)=> {
        console.log(error);
        }
      );

      this.servicioUb.getUbicacion().subscribe((data:any)=>{
          this.ubicaciones=data;
        this.ubicacion=this.ubicaciones.find((m)=>{return m.libro.titulo==this.titulo});
        this.idU=this.ubicacion.id

        },(error)=> {
          console.log(error);
        }
      );

      this.servicioSoli.getSolicitudes().subscribe((data:any)=>{
          this.solicitudes=data;
          let cont=0;
          for (let sol of this.solicitudes){
            if (sol.libro.titulo==this.titulo){
              cont=1;
            }
          }
          if (cont==1){
            this.solicitud=this.solicitudes.find((m)=>{return m.libro.titulo==this.titulo});
            this.idS=this.solicitud._id;
          }

        },(error)=> {
          console.log(error);
        }
      );
    }else {
      this.editing=false;
    }
    console.log("Inicio")
    console.log(this.editing)
  }

  ngOnInit(): void {
  }

  estado:boolean= true;


  Guardar():void {
    console.log(this.libros)
    console.log(this.idL)
    console.log(this.idS)
    console.log(this.idU);
    this.libro.fecha_publicacion= this.pipe.transform(this.libro.fecha_publicacion, 'yyyy-MM-dd');

    this.solicitud.libro=this.libro

    console.log(this.libro)
    this.ubicacion.libro=this.libro;
    console.log(this.ubicacion)
    console.log(this.solicitud)

    this.servicioLi.getLibros().subscribe((x:any)=>{
      this.librosLista=x
      console.log(x)
      console.log("Nueva Lista")
    })

    if (this.libro.estado=="Disponible"){
      this.libro.estado= true;
    }else
    {
      this.libro.estado= false;
    }

    console.log(this.tituloExist())

    if (this.editing){
      this.servicioLi.update(this.libro,this.idL).subscribe(res=>{
        console.log("creado")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500})
      })

      if (this.idS!=null){
        this.servicioSoli.update(this.solicitud,this.idS).subscribe(res=> {
          this.router.navigate(['/Listado'])
        })
      }

    }else {
      if (this.tituloExist()==false){
        this.servicioLi.createLibros(this.libro).subscribe(res=>{
          this.router.navigate(['/Listado'])
          console.log("creado")
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro creado correctamente!',
            showConfirmButton: false,
            timer: 1500})
        });

      } else {
        console.log("Ya existe")
      }
    }

    if (this.editing){
      this.servicioUb.update(this.ubicacion,this.idU).subscribe(res=>{
        this.router.navigate(['/Listado']);
      });

    }else{
      if (this.tituloUbicacion()==false){
        this.servicioUb.create(this.ubicacion).subscribe(res=> {
            this.router.navigate(['/Listado'])
            console.log("Ubicacion creada")
          },error => {
            console.log(error)
          }
        );
      }else{
        console.log("Ya existe")
      }

    }
    this.nuevo=true;
    this.guarda=false;


  }

  Reload(){
    window.location.reload();
  }

  // @ts-ignore
  tituloExist():boolean{
    let cont=0;
    for (let ll of this.librosLista){
      if (this.libro.titulo==ll.titulo){
        console.log("Entra en iguales")
        cont=1;
      }
      console.log(cont +"Numero titulo")
    }

    if (cont>0){
      return true;
    } else{
      return false;
    }
  }

  tituloUbicacion():boolean{
    let cont=0;
    for (let ll of this.ubicacionesLista){
      if (this.ubicacion.libro.titulo==ll.libro.titulo && this.ubicacion.localizacion==ll.localizacion){
        console.log("Entra en iguales")
        cont=1;
      }
      console.log(cont +"Numero titulo")
    }

    if (cont>0){
      return true;
    } else{
      return false;
    }

  }

}
