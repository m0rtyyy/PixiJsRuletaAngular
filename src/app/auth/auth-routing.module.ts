import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
// import { OlvidoContrasenaComponent } from './pages/olvido-contrasena/olvido-contrasena.component';
// import { RestablecerContrasenaComponent } from './pages/restablecer-contrasena/restablecer-contrasena.component';

const routes: Routes = [ 
  {
    path: "",
    children: [
      { path: "login", component: LoginComponent },
    //   { path: "recordar-contrasena", component: OlvidoContrasenaComponent },
    //   { path: "restablecer-contrasena", component: RestablecerContrasenaComponent },
      { path: "**", redirectTo: "login" }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }