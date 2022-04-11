import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LogginComponent } from './loggin/loggin.component';
import { InicioSessionComponent } from './inicio-session/inicio-session.component';
import { PaginaElementosComponent } from './pagina-elementos/pagina-elementos.component';
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {PanelModule} from "primeng/panel";
import {ImageModule} from "primeng/image";
import {GalleriaModule} from "primeng/galleria";
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PieComponent } from './pie/pie.component';
import {SlideMenuModule} from "primeng/slidemenu";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    LogginComponent,
    InicioSessionComponent,
    PaginaElementosComponent,
    EncabezadoComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    PanelModule,
    ImageModule,
    GalleriaModule,
    SlideMenuModule,
    ReactiveFormsModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
