import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";
import {UserService} from "../ConexionServicios/UserService";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {LibrosModelo} from "../Modelos/LibrosModelo";
import {getLocaleDateFormat} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  nombreI:any;
  apellidosI:any;
  usuarioI:any;
  generoI:any;
  contraI:any;

  tituloI:any;
  autorI:any;
  editorialI:any;
  fechaPI:any;
  idiomaI:any;
  clasificacionI:any;
  ubicacionI:any;
  urlI:any;
  EstadoI:any;
  resumenI:any;

  local:String="";
  titulo:String="";
  reservacion: Array<any>=[];
  listaUser: Array<any>=[];
  listaUserFil:Array<any>=[];
  reservacionFil: Array<any>=[];
  router:Router
  user:UserService;
  solicitud:SolicitudesService;
  constructor(activedRoute: ActivatedRoute, ubicaService:UbicacionService,
              router:Router,user:UserService,solicitud:SolicitudesService) {
    this.router=router;
    this.user=user;
    this.solicitud=solicitud;
    activedRoute.params.subscribe(param=>{
      this.local= param['localizacion'];
      this.titulo = param['titulo'];
      console.log(this.local)
      console.log(this.titulo)
      ubicaService.getUbicacion().subscribe((x:any)=> {
        this.reservacion = x;
        for (let ub of this.reservacion){
          if (ub.libro.titulo==this.titulo && ub.localizacion==this.local){
            this.reservacionFil.push(ub);
            console.log(ub)
          }else{
            console.log("No entra")
          }
        }

      });
    });

  }

  ngOnInit(): void {
    let name = localStorage.getItem('usu');
    console.log(name)
    this.user.getUsuarios().subscribe(x=> {
      this.listaUser=x;
      for (let u of this.listaUser){
        if (u.usuario==name){
          this.listaUserFil.push(u);
          console.log("Usuario Fitrado")
          console.log(u)
        }else{
          console.log("No entra")
        }
      }
    })
  }

  TReservacion(){

    for (let us of this.listaUserFil){
      this.nombreI=us.nombres;
      this.apellidosI=us.apellidos;
      this.generoI=us.genero;
      this.usuarioI=us.usuario;
      this.contraI=us.password;
    }
    let usu={
      "nombres" : this.nombreI,
      "apellidos" : this.apellidosI,
      "genero" : this.generoI,
      "usuario" : this.usuarioI,
      "password" : this.contraI
    }

    console.log(usu)
    for (let lb of this.reservacionFil){
      this.tituloI=lb.libro.titulo;
      this.autorI=lb.libro.autores;
      this.editorialI=lb.libro.editorial;
      this.fechaPI=lb.libro.fecha_publicacion;
      this.idiomaI=lb.libro.idioma;
      this.clasificacionI=lb.libro.clasificacion;
      this.resumenI=lb.libro.resumen;
      this.urlI=lb.libro.link;
      this.EstadoI=lb.libro.estado;
    }

    let libro={
      "titulo" : this.tituloI,
      "autores" : this.autorI,
      "editorial" : this.editorialI,
      "fecha_publicacion" :this.fechaPI,
      "idioma" : this.idiomaI,
      "clasificacion" : this.clasificacionI,
      "resumen" : this.resumenI,
      "link" : this.urlI,
      "estado" : this.EstadoI
    }

    console.log(libro)
    let soli={
      "comentario":"",
      "estado" :"",
      "genero":"",
      "user": usu,
      "libro":libro
    }

    console.log(soli)
    if(this.solicitud.create(soli)){
      this.correcto()

    }else{
      this.correcto()
    }
  }

  Cancelar(){
    this.router.navigateByUrl("/Listado")
  }

  error(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error! ',
      text:' Disculpe los inconvenientes' +
        'Trabajamos para mejorar el servicio',
      showConfirmButton: true,

    })
  }

  correcto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Reservacion realizada correctamente',
      text: 'Recuerde que para retirar su reservación debe llevar la cédula ',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigateByUrl('/Listado')

  }

}
