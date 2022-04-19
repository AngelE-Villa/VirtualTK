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


  listaUser: Array<any>=[];
  listaUserFil:Array<any>=[];

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

  Cerrar(){
      localStorage.removeItem('usu')
      window.location.reload();
  }

}
