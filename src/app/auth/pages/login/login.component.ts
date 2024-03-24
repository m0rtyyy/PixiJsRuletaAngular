import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/interface';
import { AuthService } from '../../services/auth.service';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { SwalNotificacionesService } from 'src/app/core/services/swal-notificaciones.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario:string = "";
  contrasena:string = "";
  aceptarCookies:boolean;
  estado:number = 0;
  remember: number = 0;


  constructor(private router:Router,
              private auth:AuthService,
              private crypto:CryptoService,
              private notificaciones:SwalNotificacionesService) {
    this.aceptarCookies = false;
  }

  ngOnInit(): void {    
    this.auth.recuperarUsuario().then((usuario:Usuario) => {
      if(usuario){
        this.router.navigate(['/app'], {queryParams: {}});

        // if(usuario.categoria=='A'){
        //   this.router.navigate(['/app/Inicio'], {queryParams: {}});

        // }else if(usuario.categoria=='J'){
        //   this.router.navigate(['/app/Encuestas'], {queryParams: {}});

        // }
      }
    });
  }

  login(usuario:string, contrasena:string, remember:any){
    // this.estado=1;
    
    if ((usuario != "" && usuario != undefined) && (contrasena != "" && contrasena != undefined)){

      this.notificaciones.lanzarNotificacionLogin(usuario).then(() => {
        this.notificaciones.lanzarShowLoading();
          
        this.auth.obtenerToken(usuario, contrasena, remember).then((x) => {
          this.notificaciones.lanzarCloseShowLoading();
          
          if(x.error){ 
            var mensajeError;
            if(x.error.message){
              mensajeError = x.error.message;
            }else{
              mensajeError = x.error;
            }

            if (typeof mensajeError === 'object') {
              mensajeError=mensajeError.error
              
            }
            this.notificaciones.lanzarNotificacionError("Error", mensajeError);
            // this.router.navigate(['/app/Inicio'], {queryParams: {categoria: this.crypto.encriptar(x.categoria)}});              
          }else{
            this.router.navigate(['/app/Inicio'], {queryParams: {}});
          }
        }).catch(z => {
          
          this.notificaciones.lanzarCloseShowLoading();
          this.notificaciones.lanzarNotificacionError("Error", "Algo salio mal");
        });
      }).catch(error => {
          this.notificaciones.lanzarCloseShowLoading();
          this.notificaciones.lanzarNotificacionError("Error", error.message);
      });

    }else{
      if ( usuario == "" || usuario == undefined) {
        this.notificaciones.lanzarNotificacionError("Nombre de Usuario Vacio", "Introduce un nombre de usuario");
      } else if ( contrasena == "" || contrasena == undefined) {
        this.notificaciones.lanzarNotificacionError("Contraseña Vacia", "Introduce una contraseña");
      }
    }    
  }

  register(usuario:string, contrasena:string, remember:any){
    // this.estado=1;
    
    if ((usuario != "" && usuario != undefined) && (contrasena != "" && contrasena != undefined)){

      this.notificaciones.lanzarNotificacionRegistro(usuario).then(() => {
        this.notificaciones.lanzarShowLoading();
          
        this.auth.registro(usuario, contrasena, remember).then((x) => {
          this.notificaciones.lanzarCloseShowLoading();
          
          if(x.error){ 
            var mensajeError;
            if(x.error.message){
              mensajeError = x.error.message;
            }else{
              mensajeError = x.error;
            }

            if (typeof mensajeError === 'object') {
              mensajeError=mensajeError.error
              
            }
            this.notificaciones.lanzarNotificacionError("Error", mensajeError);
            // this.router.navigate(['/app/Inicio'], {queryParams: {categoria: this.crypto.encriptar(x.categoria)}});              
          }else{
            this.router.navigate(['/app/Inicio'], {queryParams: {}});
          }
        }).catch(z => {          
          this.notificaciones.lanzarCloseShowLoading();
          this.notificaciones.lanzarNotificacionError("Error", "Algo salio mal");
        });
      }).catch(error => {
          this.notificaciones.lanzarCloseShowLoading();
          this.notificaciones.lanzarNotificacionError("Error", error.message);
      });

    }else{
      if ( usuario == "" || usuario == undefined) {
        this.notificaciones.lanzarNotificacionError("Nombre de Usuario Vacio", "Introduce un nombre de usuario");
      } else if ( contrasena == "" || contrasena == undefined) {
        this.notificaciones.lanzarNotificacionError("Contraseña Vacia", "Introduce una contraseña");
      }
    }    
  }

  aceptarCookiesApp(){
    if(this.aceptarCookies){
      this.aceptarCookies = false;
    }else{
      this.aceptarCookies = true;
    }
  }

  factorDobleAutenticacion(usuario:string, contrasena:string){
    this.notificaciones.lanzarNotificacionDobleFactor().then((result) => {
      if (result.isConfirmed) {        
        this.auth.obtenerToken(usuario, contrasena, this.remember).then((x) => {
          this.notificaciones.lanzarCloseShowLoading();

          if(x){             
            this.router.navigate(['/app'], {queryParams: {categoria: this.crypto.encriptar(x.categoria)}});
          }else{
            this.notificaciones.lanzarNotificacionError("Código Incorrecto", "El código introducido no es correcto");
          }

        }).catch(z => {
          this.notificaciones.lanzarCloseShowLoading();
          this.notificaciones.lanzarNotificacionError("Error", "Algo salio mal");
        });
      }
    });    
  }

  irAOlvideContrasena(){
    this.router.navigate(['/auth/recordar-contrasena'], {queryParams: {}});
  }

}
