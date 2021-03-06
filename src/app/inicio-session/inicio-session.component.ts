import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../ConexionServicios/UserService";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit {

  usuario:any;
  contraseña:any;
  InicioSesion:any;

  servidor:UserService;
  usuarioL:any;
  contraL:any;
  usuarioBD : Array<any> = [];

  constructor(private _formBuilder:FormBuilder, servidor:UserService, private router:Router) {

    this.servidor=servidor;
    servidor.getUsuarios().subscribe((x:any)=>{
      this.usuarioBD=x;
    })

  }

  ngOnInit(): void {
    this.InicioSesion= this._formBuilder.group({

    });
  }

  bool:Boolean =false;
  nombreStorage: String= "";
  ingresar(){

        let opc =this.usuarioBD.length;

    for(let i=0; i< this.usuarioBD.length; i++){
        let abc=this.usuarioBD[i];

      if((abc.usuario.toString())==(this.usuarioL) && (abc.password.toString())==(this.contraL.toString())){
          this.bool=true;
          localStorage.setItem("usu", this.usuarioL);
          localStorage.setItem("gen", abc.genero);

      }
    }
    if(this.bool==true){
      this.correcto()
    }else {
      this.error()
    }

  }


  correcto(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' BIENVENIDO  '+ this.usuarioL.toString().toUpperCase(),
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigateByUrl('/Listado')

  }

  error(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error! ',
      text:' Revise sus credenciales y vuelva a intentarlo',
      showConfirmButton: true,

    })
  this.usuarioL="";
    this.contraL="";
  }
}
