import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioSessionComponent} from "./inicio-session/inicio-session.component";
import {PaginaPrincipalComponent} from "./pagina-principal/pagina-principal.component";
import {AppComponent} from "./app.component";
import {PaginaElementosComponent} from "./pagina-elementos/pagina-elementos.component";
import {LogginComponent} from "./loggin/loggin.component";
import {RegistroLibrosComponent} from "./registro-libros/registro-libros.component";
import {SolicitudesComponent} from "./solicitudes/solicitudes.component";
import {ReservacionComponent} from "./reservacion/reservacion.component";
import {LibrosComponent} from "./libros/libros.component";

const routes: Routes = [
  {path:"Ingreso",component: InicioSessionComponent},
  {path:'', component: PaginaPrincipalComponent},
  {path:"Listado", component: PaginaElementosComponent},
  {path: "Solicitud", component: SolicitudesComponent},
  {path:"Registro", component: LogginComponent},
  {path:"RegistroLibros/:titulo", component: RegistroLibrosComponent},
  {path:"RegistroLibros", component: RegistroLibrosComponent},
  {path:"Reservacion/:localizacion/:titulo", component: ReservacionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
