

//CHATGTP
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/data/services/data-service.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class GuardsDataGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthService,
              private dataService: DataServiceService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      this.siONo(next, state).then((x: boolean) => {
        if (!x) {
          this.router.navigateByUrl('/auth/login').then(() => {
            resolve(false);
          });
        }
        resolve(x);
      });
    });
  }

  siONo(next: any, state: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.recuperarUsuario().then((usuario: Usuario) => {
        if (usuario) {
          this.dataService.recuperarStorage("menu").then((x) => {
            var valido = false;
            if (x) {
              x.forEach((pagina: any) => {
                console.log(pagina)
                if (pagina.url.toLowerCase().indexOf(next.routeConfig.path.toLowerCase()) != -1) {
                  if (pagina.categoriaAcceso.indexOf(usuario.categoria) != -1) {
                    valido = true;
                  }
                }
              });
              resolve(valido);
            } else {
              this.dataService.obtenermenu(usuario.categoria).then((x) => {
                this.dataService.guardarStorage(x, "menu");
                x.forEach((pagina: any) => {
                  if (pagina.url.toLowerCase().indexOf(next.routeConfig.path.toLowerCase()) != -1) {
                    if (pagina.categoriaAcceso.indexOf(usuario.categoria) != -1) {
                      valido = true;
                    }
                  }
                });
                resolve(valido);
              });
            }
          });
        } else {
          resolve(false);
        }
      });
    });
  }
}
