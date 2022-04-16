import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {Messages} from "primeng/messages";
import {empty} from "rxjs";
import {UserService} from "../ConexionServicios/UserService";
import {ActivatedRoute} from "@angular/router";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {

  nombreI:any;
  apellidosI:any;
  usuarioI:any;
  generoI:any;
  contraI:any;
  contra2I:any;


  msgs1: any;
   servicio:UserService;
  constructor( servicio:UserService ) {
    this.servicio = servicio;
    servicio.getUsuarios().subscribe((x: any) =>{
      console.log(x)
    });
  }

  ngOnInit(): void {

  }


  guardar(){
    if(this.contraI==this.contra2I){
    console.log(this.usuarioI, this.contraI)
    this.enviar();
    }else
    {
      console.log( "no coinciden")
    }
    }

  enviar(){

    //let usu:UsuarioModelo;
    /*let usu={
      nombres:this.nombreI,
      apellidos:this.apellidosI,
      genero:this.generoI,
      usuario:this.usuarioI,
      password:this.contraI
    }*/
    let usu={
      "nombres" : this.nombreI,
      "apellidos" : this.apellidosI,
      "genero" : this.generoI,
      "usuario" : this.usuarioI,
      "password" : this.contraI
    }
    if(this.servicio.create(usu)){
      console.log("creado");
    }else{
      console.log("error")
    }


  }


}
