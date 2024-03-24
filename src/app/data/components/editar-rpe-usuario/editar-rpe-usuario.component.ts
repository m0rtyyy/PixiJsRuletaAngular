import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Usuario, UsuarioBBDD, UsuarioJugador } from 'src/app/core/models/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataServiceService } from '../../services/data-service.service';
import { SwalNotificacionesService } from 'src/app/core/services/swal-notificaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { environment } from 'src/environments/environment';
import swal from'sweetalert2';

@Component({
  selector: 'appA-editar-rpe-usuario',
  templateUrl: './editar-rpe-usuario.component.html',
  styleUrls: ['./editar-rpe-usuario.component.scss']
})
export class EditarRpeUsuarioComponent implements OnInit {

  @Input() closeModal:(any) => void;
  @Input() usuarioAEditar:UsuarioJugador;
  @Input() fechaEncuesta:any;

  usuario:Usuario;

  mediaMuscular:boolean = false;
  mediaCardio:boolean = false;
  mediaCognitiva:boolean = false;
  NoCuentaTiempoSesion:boolean = false;
  ignorar:boolean;
  mediasQuitar:any = {media_cog: null, media_piernas:null, media_cardio: null, created_at:null}


  constructor(private auth:AuthService,
    private data:DataServiceService,              
    private crypto:CryptoService,
    private activeRoute: ActivatedRoute,
    private notificaciones:SwalNotificacionesService,) {}

  ngOnInit(): void {
    this.recogerParametros().then(() => {
      this.auth.recuperarUsuario().then((usuario:Usuario) => {
        this.usuario = usuario;
        if(this.usuarioAEditar.cuenta_para_media==2){
          this.ignorar=true;
        }else{
          this.ignorar=false;
        }
        
      });  
    });
  }

  cargarDatos(){
  
  }

  editarUsuario(usuario:UsuarioJugador){

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
