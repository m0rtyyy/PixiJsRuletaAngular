import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioBBDD } from 'src/app/core/models/interface';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService,
              private http:HttpClient)
  {

  }

  obtenerToken(email:string, password:string, remember:any) {
    if(remember==1){
      remember=true;
    }else if(remember==true){
      remember=true;
    }else{
      remember=false
    }

    const user = {
      email: email,
      password: password,
      remember: remember
    }
    

    return new Promise<Usuario>( resolve => {    
        
        this.http.post(`${URL}login`, user,
        {
          headers: new HttpHeaders()            
            .set('Content-Type', 'application/json')
        })
        .subscribe((resp : any) => {           
          this.guardarToken(resp['token']).then(() => {             
            var usuario:UsuarioBBDD = resp['user'];
            this.guardarUsuario(usuario).then(() => {
              
              resolve(usuario)               
            }).catch(() => { 
              resolve({})
            });
          }).catch((resp) => {
            console.log(resp.error);
            resolve({})
          });       
        }, error => {

          resolve(error);
        });
    });
  }

  registro(email:string, password:string, remember:any) {
    if(remember==1){
      remember=true;
    }else if(remember==true){
      remember=true;
    }else{
      remember=false
    }

    const user = {
      email: email,
      password: password,
      remember: remember
    }
    

    return new Promise<Usuario>( resolve => {    
        
        this.http.post(`${URL}register`, user,
        {
          headers: new HttpHeaders()            
            .set('Content-Type', 'application/json')
        })
        .subscribe((resp : any) => {           
          this.guardarToken(resp['token']).then(() => {             
            var usuario:UsuarioBBDD = resp['user'];
            this.guardarUsuario(usuario).then(() => {
              
              resolve(usuario)               
            }).catch(() => { 
              resolve({})
            });
          }).catch((resp) => {
            console.log(resp.error);
            resolve({})
          });       
        }, error => {

          resolve(error);
        });
    });
  }

  recordarContrasena(email:string) {
    const data = {email};

    return new Promise<any>( resolve => {      
        this.http.post(`${URL}RestablecePassword/RestableceContrasena`, data,
        {
          headers: new HttpHeaders()            
            .set('Content-Type', 'application/json')
        })
        .subscribe((resp : any) => { 
          resolve(resp);    
        }, error => {
          resolve(null);
        });
    });
  }
  

  restablecerContrasena(token:string, contrasena:string) {
    const data = {token, contrasena};

    return new Promise<any>( resolve => {      
        this.http.post(`${URL}RestablecePassword/CambiarContrasena`, data,
        {
          headers: new HttpHeaders()            
            .set('Content-Type', 'application/json')
        })
        .subscribe((resp : any) => { 
          resolve(resp);    
        }, error => {
          resolve(null);
        });
    });
  }

  async guardarToken(token: string) {
    await this.storage.set('token', token);
  }

  async recuperarToken() {
    var token = await this.storage.get('token');
    return  token;
  }

  async guardarUsuario(usuario: Usuario) {
    await this.storage.set('usuario', usuario);
  }

  async eliminarUsuario() {
    await this.storage.remove('usuario');
  }

  async recuperarUsuario() {
    var token = await this.storage.get('usuario');
    return  token;
  }  
}
