import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioBBDD } from 'src/app/core/models/interface';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private auth:AuthService,
    private http:HttpClient,
    private storage: StorageService,
    private router:Router) { }


    //-----------------------GENERALES
    obtenermenu(categoria:any) {
      const data = {categoria}     
      return new Promise<any>((resolve, reject) => {        
        this.auth.recuperarToken().then(x => {
          this.http.post(`${URL}menu/obtenermenu`, data,
            {
              params:{
  
              },
              headers: new HttpHeaders()
                .set('Authorization',`Bearer ${x}`)
                .set('Content-Type', 'application/json')
            }
          ).subscribe((resp:any) => {
            console.log(resp);
            
            resolve(resp);
          }, error => {
            this.cerrarSesion();               
          });
        }).catch(() => { 
          this.cerrarSesion();     
        });
      });
    }

  //--------------------USUARIOS--------
  guardarFoto(file:File) {
    return new Promise<any>((resolve, reject) => {  
      const formData = new FormData();
      formData.append('file', file);
      const boundary = '------WebKitFormBoundary' + Math.random().toString(36);
      this.auth.recuperarToken().then(x => {
        this.http.post(`${URL}users/guardarFoto`, formData,
          {
            params:{

            },
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${x}`)
            .set('Content-Type', 'multipart/form-data; boundary=' + boundary)
          }
        ).subscribe((resp:any) => {
          console.log(resp);
          
          resolve(resp);
        }, error => {
          console.log(error);
          
          // this.cerrarSesion();               
        });
      }).catch(() => { 

        // this.cerrarSesion();     
      });
    });
  }

  obtenerUsuario(id:number) {  
    const data = {id}
    return new Promise<any>((resolve, reject) => {        
      this.auth.recuperarToken().then(x => {
        this.http.post(`${URL}users/obtenerUsuario`, data,
          {
            params:{

            },
            headers: new HttpHeaders()
              .set('Authorization',`Bearer ${x}`)
              .set('Content-Type', 'application/json')
          }
        ).subscribe((resp:any) => {
          console.log(resp);
          
          resolve(resp);
        }, error => {
          this.cerrarSesion();               
        });
      }).catch(() => { 
        this.cerrarSesion();     
      });
    });
  }

  editarUsuario(usuarioNuevo:any) {  
    return new Promise<any>((resolve, reject) => {        
      this.auth.recuperarToken().then(x => {
        this.http.post(`${URL}users/editarUsuario`, usuarioNuevo,
          {
            params:{

            },
            headers: new HttpHeaders()
              .set('Authorization',`Bearer ${x}`)
              .set('Content-Type', 'application/json')
          }
        ).subscribe((resp:any) => {
          console.log(resp);
          
          resolve(resp);
        }, error => {
          this.cerrarSesion();               
        });
      }).catch(() => { 
        this.cerrarSesion();     
      });
    });
  }


  //--------------------GENERAL2
  async guardarStorage(datoGuardar: any, nombre:string) {
    await this.storage.set(nombre , datoGuardar);
  }

  async recuperarStorage(nombre:string) {
    var datoGuardar: any = await this.storage.get(nombre);
    return datoGuardar;
  }

  async borrarStorage(nombre:string) {
    await this.storage.remove(nombre);
  }

  cerrarSesion(){
    const data = {}     
    return new Promise<any>((resolve, reject) => {        
      this.auth.recuperarToken().then(x => {
        this.http.post(`${URL}logout`, data, 
          {
            params:{
            },
            headers: new HttpHeaders()
              .set('Authorization',`Bearer ${x}`)
              .set('Content-Type', 'application/json')
          }
        ).subscribe((resp:any) => {
          this.storage.clear();
          this.router.navigateByUrl('/auth/login');
          
          resolve(resp);
        }, error => {
          this.storage.clear();
          this.router.navigateByUrl('/auth/login');               
        });
      }).catch(() => { 
        this.storage.clear();
        this.router.navigateByUrl('/auth/login');    
      });
    });
      
  }
}
