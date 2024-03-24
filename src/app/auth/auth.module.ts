import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {CheckboxModule} from 'primeng/checkbox';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
 import { FooterCookiesComponent } from '../data/components/footer-cookies/footer-cookies.component';
 import { OlvidoContrasenaComponent } from './pages/olvido-contrasena/olvido-contrasena.component';

// Captcha
import {CaptchaModule} from 'primeng/captcha';
import { RestablecerContrasenaComponent } from './pages/restablecer-contrasena/restablecer-contrasena.component';
// -----------------

@NgModule({
  declarations: [
    LoginComponent,
    FooterCookiesComponent,
    OlvidoContrasenaComponent,
    RestablecerContrasenaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    CaptchaModule,
    CheckboxModule   
  ]
})
export class AuthModule { }