import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/core/models/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataServiceService } from '../../services/data-service.service';
import { SwalNotificacionesService } from 'src/app/core/services/swal-notificaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { environment } from 'src/environments/environment';
import { UsuarioBBDD } from '../../../core/models/interface';
 import { RuletaComponent } from '../../games/ruleta/ruleta.component';

const URL = environment.url;



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild(RuletaComponent) ruletaComponent;

  usuario:Usuario;
  constructor(private auth:AuthService,
    private data:DataServiceService,              
    private crypto:CryptoService,
    private activeRoute: ActivatedRoute,
    private notificaciones:SwalNotificacionesService,) {}

  ngOnInit(): void {
    this.recogerParametros().then(() => {
      this.auth.recuperarUsuario().then((usuario:Usuario) => {
        this.usuario = usuario;
        
      });  
    });
  }

  cargarDatos(){      
  }


  recogerParametros(){
    return new Promise<any>( (resolve, reject) => { 
      this.activeRoute.queryParamMap.subscribe(params => {  

        // var subtitulo = params.get('nombreOpcion');
        // if(subtitulo){ this.objetoTitulo.subtitulo = this.crypto.desencriptar(subtitulo) }
        
        // var estudio = params.get('estudio');        
        // if(estudio){ 
        //   this.estudio = this.crypto.desencriptar(estudio);
        // }

        resolve("ok");
      }); 
    });
  }

}
