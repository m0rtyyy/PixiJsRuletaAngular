import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models/interface';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { DataServiceService } from '../../services/data-service.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  itemsMenu: MenuItem[] = [];
  usuario:any;
  constructor(  private auth:AuthService,
                private router:Router,
                private dataService:DataServiceService,
                private crypto:CryptoService,
                private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.auth.recuperarUsuario().then((usuario:Usuario) => {
      this.usuario = usuario; 
      this.dataService.recuperarStorage("menuEstudios").then((menu:any) => {
        if(menu){
          this.itemsMenu = this.configurarMenuInterfaz(menu);
          
        }else{
          this.dataService.obtenermenu(this.usuario.categoria).then((menu:any) => {
            this.dataService.guardarStorage(menu, "menuEstudio");
            this.itemsMenu = this.configurarMenuInterfaz(menu);

          });
        }
      });
    }); 
  }


  configurarMenuInterfaz(menu:any){
    var lista:any[] = [];
    menu.forEach((fila:any) => {  
      let item:any = {};  
      let url:string = '/app/';
      //METEMOS NIVEL 0 Y DESPLEGABLE 0 (NORMALMENTE, LOS INICIOS TIENEN ESTA CONF)
      if(fila.nivel==0 && fila.desplegable==null){
        url += fila.url;
        
        item = {label: fila.nombreWeb, icon: fila.icono, routerLink: url, routerLinkActive:"active"};
      //METEMOS NIVEL 0 Y DESPLEGABLES (Y METEMOS LOS NIVELES 1 QUE PERTENEZCAN.)
      }else if(fila.nivel==0 && fila.desplegable==1){
        let item2:any = [];
        menu.forEach((filaDesplegable:any) => {
          if((filaDesplegable.nivelup==fila.nivel)&&(filaDesplegable.idup==fila.id)){
            let item3 = {label: filaDesplegable.nombreWeb, icon: filaDesplegable.icono, routerLink:[], routerLinkActive:"active"};
            if(filaDesplegable.url) {
              item3.routerLink = [`/app/${filaDesplegable.url}`];
            }
            item2.push(item3);
          } 
            
        });
        item = {label: fila.nombreWeb, icon: fila.icono, items:item2, routerLinkActive:"active"} 
      }
  
      
      if(item.label == null){
      }else{
        lista.push(item);
      }
  
    });
    return lista;
  }
  

  cerrarSesion(){
    this.dataService.cerrarSesion();
  }
}
