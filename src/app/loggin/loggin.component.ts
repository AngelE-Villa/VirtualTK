import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {Messages} from "primeng/messages";
import {empty} from "rxjs";
import {UserService} from "../ConexionServicios/UserService";
import {ActivatedRoute} from "@angular/router";

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

  constructor( ) {

  }

  ngOnInit(): void {

  }


  guardar(){
    if(this.contraI==this.contra2I){
    console.log(this.usuarioI, this.contraI)

    }else
    {
      console.log( "no coinciden")
    }
    }

  mensajeError(){

  }


}
