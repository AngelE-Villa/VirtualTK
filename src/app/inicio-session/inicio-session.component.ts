import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../ConexionServicios/UserService";


@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit {

  usuario:any;
  contraseña:any;
  InicioSesion:any;
  opc:boolean;
  servidor:UserService;
  constructor(private _formBuilder:FormBuilder, servidor:UserService) {
    this.opc=true;
    this.servidor=servidor;

  }

  ngOnInit(): void {
    this.InicioSesion= this._formBuilder.group({

    });
  }

  ingresar(){
    this.servidor.getUsuarios().subscribe((x: any) =>{

    });
  }


}
