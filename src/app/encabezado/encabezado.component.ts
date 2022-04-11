import { Component, OnInit } from '@angular/core';
import {empty} from "rxjs";
import {MenuItem} from "primeng/api";
import {newArray} from "@angular/compiler/src/util";
import {MenuItemContent} from "primeng/menu";

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  opc:boolean;
  constructor() {
  this.opc=true;
  }

    ngOnInit(): void {
  }

}
