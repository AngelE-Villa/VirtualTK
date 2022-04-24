import {Component, Input, OnInit} from '@angular/core';
import {SolicitudesService} from "../ConexionServicios/SolicitudesService";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {LibrosModelo} from "../Modelos/LibrosModelo";

import Swal from "sweetalert2";
import {LibrosService} from "../ConexionServicios/LibrosService";
import {UbicacionService} from "../ConexionServicios/UbicacionService";
import {solicitudModelo} from "../Modelos/SolicitudModelo";
import {UbicacionModelo} from "../Modelos/UbicacionModelo";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  post : any;
  titulosColumnas = ['Estado Libro',
  'Estado',
  'Ubicación',
  'Clasificación',
  'Usuario',
  'Libro',
  'Aceptar',
  'Rechazar'];

  titulosColumnas1 = ['Estado Libro',
    'Estado',
    'Ubicación',
    'Clasificación',
    'Usuario',
    'Libro',
    'Recibir'];

 filas:Array<any>=[];

 tablaS:any;

 //Variables
  nombreI:any;
  apellidosI:any;
  usuarioI:any;
  generoI:any;
  contraI:any;

  idI:any;
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

  //Ubicacion
  idUbiI:any;

  //Solicitudes
  SolicitudesLista:Array<any>=[];
  SolicitudesListaFil:Array<any>=[];
  SolicitudesListaFil2:Array<any>=[];
  solicitudxid:Array<any>=[];

  //Libros
  librosLista:Array<any>=[];
  libroxid:Array<any>=[];
  libroxidN:Array<any>=[];

  //Ubicaciones
  ubicacionLista:Array<any>=[];
  ubicacionxid:Array<any>=[];

  //Variables
  idSoliU:any;
  comentarioU:any;
  estadoU:any;
  generoU:any;
  usuarioU: UsuarioModelo= new UsuarioModelo();
  libroU:LibrosModelo= new LibrosModelo();

  visibilidad:Boolean=false;
  visibilidadE:Boolean=false;
  visibilidadR:Boolean=false;
  filaNum:any;
  display: boolean = false;
  comprobacion:boolean=false;
  idSolicitud:String="";
  idLibro:String="";
  idUbica:String="";

  //Modelo
  mlibro:LibrosModelo=new LibrosModelo();

  showDialog() {
    this.display = true;
  }

  librosService:LibrosService;
  ubicacionService:UbicacionService;
  servicio:SolicitudesService;

  constructor(servicio:SolicitudesService, libroService:LibrosService, ubicacionService:UbicacionService) {
    this.librosService=libroService;
    this.ubicacionService=ubicacionService;
    this.servicio=servicio;

    //Servicio Solicitudes
    servicio.getSolicitudes().subscribe((x: any) => {
      this.SolicitudesLista = x
      console.log(x)
      for(let sol of this.SolicitudesLista){
        if (sol.libro.estado==true && sol.estado==false){
          console.log("Solicitudes")
          console.log(sol)
          this.SolicitudesListaFil.push(sol);
        }else {
          console.log("Prestados")
          console.log(sol)
          this.SolicitudesListaFil2.push(sol);
        }

      }
    });

    //Servicio libros
    libroService.getLibros().subscribe((x: any) => {
      this.librosLista = x
      console.log(x)
    });


    //Servicio ubicaciones
    ubicacionService.getUbicacion().subscribe((x: any) => {
      this.ubicacionLista = x
      console.log(x)
    });

  }

  ngOnInit() {

  }


  editar(){
    this.visibilidad=true;

  }
//Seleccionar
  eliminar(user:String,titulo:String){
    for (let soli of this.SolicitudesLista){
      if (soli.user.nombres==user && soli.libro.titulo==titulo){
        this.idSolicitud=soli._id;
      }

    }
    this.visibilidadE=true;
  }

  finalizarElimnar(){
    console.log(this.idSolicitud+"  F-Eliminar")
    console.log(this.servicio.delete(this.idSolicitud))
    this.servicio.delete(this.idSolicitud);
      this.editarCorrecto();
      this.visibilidadE=false;
    window.location.reload();
  }


  editarCorrecto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Registro Eliminado  ',
      showConfirmButton: false,
      timer: 1500
    })
    this.visibilidadE=false
  }

  ApectacionCorrecto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Se ha aceptado la solicitud ',
      showConfirmButton: false,
      timer: 1500
    })
    this.visibilidadE=false
  }

  RecibirCorrecto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Se ha recibido el libro Correctamente ',
      showConfirmButton: false,
      timer: 1500
    })
    this.visibilidadE=false
  }

  selecionarDatos(titulo:String,ubicacion:String,user:String){
    this.visibilidad=true;
    for (let ediLibro of this.librosLista){
      if (ediLibro.titulo==titulo){
        this.idLibro=ediLibro._id;
        this.libroxid=ediLibro;
        console.log(this.idLibro)
      }

    }

    for (let ediUbica of this.ubicacionLista){
      if (ediUbica.libro.titulo==titulo && ediUbica.localizacion==ubicacion){
        this.idUbica=ediUbica.id;
        this.ubicacionxid=ediUbica;
        console.log(this.idUbica)
      }

    }

    for (let ediSoli of this.SolicitudesLista){
      if (ediSoli.user.nombres==user && ediSoli.libro.titulo==titulo){
        this.idSolicitud=ediSoli._id;
        this.solicitudxid=ediSoli;
        console.log(this.idSolicitud)
      }

    }

    for (let soli of this.SolicitudesLista) {
      if (soli.user.nombres == user && soli.libro.titulo == titulo) {
        this.idSolicitud = soli._id;
      }
    }

  }

  selecionarDatosR(titulo:String,ubicacion:String,user:String){
    this.visibilidadR=true;
    for (let ediLibro of this.librosLista){
      if (ediLibro.titulo==titulo){
        this.idLibro=ediLibro._id;
        this.libroxid=ediLibro;
        console.log(this.idLibro)
      }

    }

    for (let ediUbica of this.ubicacionLista){
      if (ediUbica.libro.titulo==titulo && ediUbica.localizacion==ubicacion){
        this.idUbica=ediUbica.id;
        this.ubicacionxid=ediUbica;
        console.log(this.idUbica)
      }

    }

    for (let ediSoli of this.SolicitudesLista){
      if (ediSoli.user.nombres==user && ediSoli.libro.titulo==titulo){
        this.idSolicitud=ediSoli._id;
        this.solicitudxid=ediSoli;
        console.log(this.idSolicitud)
      }

    }

    for (let soli of this.SolicitudesLista) {
      if (soli.user.nombres == user && soli.libro.titulo == titulo) {
        this.idSolicitud = soli._id;
      }
    }

  }

  Aceptar(){

    for (let nl of this.librosLista) {
      console.log(this.idLibro+"  F-Editar L")
      if (nl._id==this.idLibro){
        this.idI=nl._id;
        this.tituloI=nl.titulo;
        this.autorI=nl.autores;
        this.editorialI=nl.editorial;
        this.fechaPI=nl.fecha_publicacion;
        this.idiomaI=nl.idioma;
        this.clasificacionI=nl.clasificacion;
        this.resumenI=nl.resumen;
        this.urlI=nl.link;
        this.EstadoI=false;
      }

    }

    let libro1={
      "_id":this.idI,
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

    for(let ls of this.SolicitudesLista){
      if (ls._id==this.idSolicitud){
          this.idSoliU=ls._id;
          this.comentarioU=ls.comentario;
          this.estadoU=ls.estado;
          this.generoU=ls.genero;
          this.nombreI=ls.user.nombres;
          this.apellidosI=ls.user.apellidos;
          this.generoI=ls.user.genero;
          this.usuarioI=ls.user.usuario;
          this.contraI=ls.user.password;
      }
    }

    for(let lu of this.ubicacionLista){
      if (lu.id==this.idUbica){
        this.idUbiI=lu.id
        this.ubicacionI=lu.localizacion;
      }
    }

    let usu={
      "nombres" : this.nombreI,
      "apellidos" : this.apellidosI,
      "genero" : this.generoI,
      "usuario" : this.usuarioI,
      "password" : this.contraI
    }

    let ubi={
      "id":this.idUbiI,
      "libro":libro,
      "localizacion":this.ubicacionI
    }

    let soli={
      "_id":this.idSoliU,
      "comentario":"",
      "estado" :true,
      "genero":"",
      "user": usu,
      "libro":libro,
      "ubicacion":this.ubicacionI
    }

    this.servicio.update(soli,this.idSolicitud);
    this.librosService.update(libro1,this.idLibro);
    this.ubicacionService.update(ubi,this.idUbica);
    this.visibilidad=false;
    this.ApectacionCorrecto();
    //window.location.reload();
  }

  Recibir() {

    for (let nl of this.librosLista) {
      console.log(this.idLibro + "  F-Editar L")
      if (nl._id == this.idLibro) {
        this.idI = nl._id;
        this.tituloI = nl.titulo;
        this.autorI = nl.autores;
        this.editorialI = nl.editorial;
        this.fechaPI = nl.fecha_publicacion;
        this.idiomaI = nl.idioma;
        this.clasificacionI = nl.clasificacion;
        this.resumenI = nl.resumen;
        this.urlI = nl.link;
        this.EstadoI = true;
      }

    }

    let libro1 = {
      "_id": this.idI,
      "titulo": this.tituloI,
      "autores": this.autorI,
      "editorial": this.editorialI,
      "fecha_publicacion": this.fechaPI,
      "idioma": this.idiomaI,
      "clasificacion": this.clasificacionI,
      "resumen": this.resumenI,
      "link": this.urlI,
      "estado": this.EstadoI
    }

    let libro = {
      "titulo": this.tituloI,
      "autores": this.autorI,
      "editorial": this.editorialI,
      "fecha_publicacion": this.fechaPI,
      "idioma": this.idiomaI,
      "clasificacion": this.clasificacionI,
      "resumen": this.resumenI,
      "link": this.urlI,
      "estado": this.EstadoI
    }


    for (let ls of this.SolicitudesLista) {
      if (ls._id == this.idSolicitud) {
        this.idSoliU = ls._id;
        this.comentarioU = ls.comentario;
        this.estadoU = ls.estado;
        this.generoU = ls.genero;
        this.nombreI = ls.user.nombres;
        this.apellidosI = ls.user.apellidos;
        this.generoI = ls.user.genero;
        this.usuarioI = ls.user.usuario;
        this.contraI = ls.user.password;
      }
    }

    for (let lu of this.ubicacionLista) {
      if (lu.id == this.idUbica) {
        this.idUbiI = lu.id
        this.ubicacionI = lu.localizacion;
      }
    }

    let usu = {
      "nombres": this.nombreI,
      "apellidos": this.apellidosI,
      "genero": this.generoI,
      "usuario": this.usuarioI,
      "password": this.contraI
    }

    let ubi = {
      "id": this.idUbiI,
      "libro": libro,
      "localizacion": this.ubicacionI
    }

    let soli = {
      "_id": this.idSoliU,
      "comentario": "",
      "estado": false,
      "genero": "",
      "user": usu,
      "libro": libro,
      "ubicacion": this.ubicacionI
    }

    console.log(this.idSolicitud)

    this.servicio.update(soli,this.idSolicitud);
    this.librosService.update(libro1,this.idLibro);
    this.ubicacionService.update(ubi,this.idUbica);
    this.servicio.delete(this.idSolicitud)
    this.visibilidadR=false;
    this.RecibirCorrecto();
    //window.location.reload();
  }


}


