import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAuthGuard } from './../app/core/guards/guard-auth.guard';


const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>  import("./auth/auth.module").then( m => m.AuthModule )
  },
  {
    path: "app",
    loadChildren: () =>  import("./data/data.module").then( m => m.dataModule ), canActivate : [GuardAuthGuard] 
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
