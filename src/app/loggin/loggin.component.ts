import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {Messages} from "primeng/messages";
import {empty} from "rxjs";
import {UserService} from "../ConexionServicios/UserService";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioModelo} from "../Modelos/usuarioModelo";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';


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


   servicio:UserService;


  constructor( servicio:UserService,  private router:Router ) {
    this.servicio = servicio;
    servicio.getUsuarios().subscribe((x: any) =>{
      console.log(x)
    });

  }

  ngOnInit(): void {


  }
  camposvacios:boolean=false;

  validarCampos(){
    if (this.nombreI==null || this.apellidosI==null || this.usuarioI==null
      || this.generoI==null || this.contraI==null || this.contra2I==null){
      this.camposvacios=true;
      return false;
    }else {
      return true;
    }
  }

  guardar(){
    if (this.validarCampos()){
      if(this.contraI==this.contra2I){
        console.log(this.usuarioI, this.contraI)
        this.enviar();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Correcto BIENVENIDO',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/Ingreso')
      }else
      {
        console.log( "no coinciden")
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error! ',
          text:'No se pudo completar el registro Revise sus datos y vuelva a intentarlo',
          showConfirmButton: true,

        })
        this.limpiar()
      }
    }

    }

  enviar(){

    let usu={
      "nombres" : this.nombreI.toString(),
      "apellidos" : this.apellidosI.toString(),
      "genero" : this.generoI.toString(),
      "usuario" : this.usuarioI.toString(),
      "password" : this.contraI.toString()
    }
    this.servicio.create(usu).subscribe((reg)=> {
      console.log(reg)
      this.router.navigateByUrl('/Ingreso')
    })


  }

  limpiar () {
    this.nombreI=""
      this.apellidosI=""
    this.usuarioI=""
      this.contraI=""
    this.contra2I=""
    this.generoI=""
  }


}
