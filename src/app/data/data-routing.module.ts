import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


import { InicioComponent } from './pages/inicio/inicio.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



 import { GuardsDataGuard } from '../core/guards/guards-data.guard';


const routes: Routes = [
  {
    path: "",
    children: [
      { path: "Inicio", component: InicioComponent, canActivate: [GuardsDataGuard] },


    ]
  },
  { path: "**", redirectTo:"Inicio" }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dataRoutingModule { }