import { Component, OnInit } from '@angular/core';
import {empty} from "rxjs";
import {MenuItem} from "primeng/api";
import {newArray} from "@angular/compiler/src/util";
import {MenuItemContent} from "primeng/menu";
import {UserService} from "../ConexionServicios/UserService";

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  opc:boolean;
  user: UserService;
  constructor(user: UserService) {
    this.user=user;
  this.opc=true;
  }

  desabilitar:boolean=false;
  listaUser: Array<any>=[];
  listaUserFil:Array<any>=[];
  HabilitarIngreso=false;
  HabilitarCerrar=false;

    ngOnInit(): void {
      let name = localStorage.getItem('usu');
      this.user.getUsuarios().subscribe(x=> {
        this.listaUser=x;
        for (let u of this.listaUser){
          if (u.usuario==name){
            this.listaUserFil.push(u);
          }else{
            console.log("No entra")
          }
        }
      })

      if (name=="admin"){
        this.desabilitar=true;
      }
      console.log(name)
      if (name==null){
        this.HabilitarIngreso=true;
        this.HabilitarCerrar=false;
      }else{
        this.HabilitarCerrar=true;
        this.HabilitarIngreso=false;
      }
  }

  Cerrar(){
      localStorage.removeItem('usu')
      window.location.reload();
  }

}
