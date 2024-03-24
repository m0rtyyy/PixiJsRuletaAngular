import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  
  constructor(private router:Router,
              private auth:AuthService) { }

  canActivate( next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    
    return this.auth.recuperarUsuario().then((usuario:Usuario) => {
      if (!usuario) {
        this.router.navigateByUrl('/auth/login');  
      }
      return true;
    });
  }
  
}