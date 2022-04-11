import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  constructor(private _formBuilder:FormBuilder) {
    this.opc=true;
  }

  ngOnInit(): void {
    this.InicioSesion= this._formBuilder.group({
      usuario: ['', [Validators.required]],
      contraseña:['',[Validators.required]]
    });
  }

  guardar(){

  }
}
