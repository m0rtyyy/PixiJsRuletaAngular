import { Injectable } from '@angular/core';
import swal from'sweetalert2';
import { UsuarioBBDD } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SwalNotificacionesService {

  constructor() { }

  lanzarShowLoading(){
    swal.showLoading(swal.getDenyButton());
  }

  lanzarCloseShowLoading(){
    swal.close();
  }

  lanzarNotificacionError(titulo:string, texto:string){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      icon: "error",
      title: titulo,
      text: texto,
      showConfirmButton: false,
      timer: 2000
    });
  }

  lanzarNotificacionAdvertencia(titulo:string, texto:string){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      icon: "warning",
      title: titulo,
      text: texto,
      showConfirmButton: false,
      timer: 2000
    });
  }

  lanzarNotificacionCorrecto(titulo:string, texto:string){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      icon: "success",
      title: titulo,
      text: texto,
      showConfirmButton: true,
      timer: 8000
    });
  }

  lanzarNotificacionRecordarContrasena(email:string){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      icon: 'info',
      title: "Modificar Contraseña",
      html: "Se ha enviado un email a <b>" + email + "</b> para cambiar su contraseña",       
      showCancelButton: false,
      showLoaderOnConfirm: false, 
      showCloseButton: false,
      showConfirmButton: false,
      timer: 3500
    });  
  }

  lanzarNotificacionEmailOlvidado(email:string){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      icon: 'info',
      title: "Restablecer Contraseña",
      html: "Si el email <b>" + email + "</b> es valido se enviara un correo para que restablezca su contraseña",       
      showCancelButton: false,
      showLoaderOnConfirm: false, 
      showCloseButton: false,
      showConfirmButton: false,
      timer: 3500
    });
  }

  lanzarNotificacionActualizarAlerta(claveAlerta:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: "",
        text: "¿Estas seguro de que desea actualizar la alerta '" + claveAlerta + "'?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0079c8',
        cancelButtonColor: '#d33',
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionBorrarGrafica(nombreTabla:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
          title: "",
          text: "¿Estas seguro de que deseas borrar la grfica guardada '" + nombreTabla + "'?",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#0079c8',
          cancelButtonColor: '#d33',
          confirmButtonText: "Borrar",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true, 
          showCloseButton: true,   
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionBorrarTabla(nombreTabla:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
          title: "",
          text: "¿Estas seguro de que deseas borrar la tabla guardada '" + nombreTabla + "'?",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#0079c8',
          cancelButtonColor: '#d33',
          confirmButtonText: "Borrar",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true, 
          showCloseButton: true,   
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionGuardarTabla(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUpGuardarTabla',
        },
        title: "Guardar Tabla",
        text: "Introduce un nombre para la tabla que vas a guardar", 
        input: 'text',            
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true, 
        showCloseButton: true,     
        preConfirm: (login) => {
  
        },
        allowOutsideClick: () => !swal.isLoading()
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionMostrarMuestra(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          confirmButton: 'botonNingunaMuestra',
          denyButton: 'botonIndicadorPrincipal',
          cancelButton: 'botonTodosIndicadores',
          popup: 'modalDiseñaTablaMuestras',
        },
        buttonsStyling: true,
        title: "Generar Informe",
        html: "Escoger muestras para generar informe <span style='font-size: 10px; color: #939393 ; font-style: italic;'>(Por defecto se selecciona Todas)</span>", 
        confirmButtonText: "Ninguna",
        denyButtonText: 'Indicador Principal', 
        cancelButtonText: "Todas",
        showConfirmButton: true,
        showDenyButton: true, 
        showCancelButton: true,
        showCloseButton: true,
        allowOutsideClick: () => !swal.isLoading()
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionLogin(nombre:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: 'Comprobando',
        html: 'Cargando perfil del usuario <b>' + nombre + '</b>',
        timer: 20000,
        timerProgressBar: true,
        
        didOpen: () => {
          resolve("CANCELAR");
        }      
      }).then((result) => {
        
      });     
    });
  }

  lanzarNotificacionRegistro(nombre:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: 'Comprobando',
        html: 'Creando el usuario <b>' + nombre + '</b>',
        timer: 20000,
        timerProgressBar: true,
        
        didOpen: () => {
          resolve("CANCELAR");
        }      
      }).then((result) => {
        
      });     
    });
  }

  lanzarNotificacionWellness(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
          title: "",
          html: "¿Estas seguro de que deseas lanzar la encuesta de <b>WELLNESS</b>?",       
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#0079c8',
          cancelButtonColor: '#d33',
          confirmButtonText: "SI",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true, 
          showCloseButton: true,   
      }).then((result) => {
        resolve(result);
      });
    });
  }

  lanzarNotificacionConfirmacion(titulo:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: 'Lanzando...',
        html: 'Lanzando los formularios de  <b>'+titulo+'</b>',
        timer: 40000,
        timerProgressBar: true,
        
        didOpen: () => {
          resolve("CANCELAR");
        }      
      }).then((result) => {
        
      });     
    });
  }

  lanzarNotificacionRPE(minutos:number){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
          title: "",
          html: "¿Estas seguro de que deseas lanzar la encuesta de RPE con <b>" + minutos + " MIN</b> de sesion de entrenamiento?",       
          // text: '¿Estas seguro de que deseas lanzar la encuesta de RPE con ' + minutos + ' MIN de sesion de entrenamiento?',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#0079c8',
          cancelButtonColor: '#d33',
          confirmButtonText: "SI",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true, 
          showCloseButton: true,   
      }).then((result) => {
        resolve(result);
      });
    });
  }


  lanzarNotificacionDobleFactor(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalRecordarDosPasos',
        },
        buttonsStyling: true,
        title: "Doble factor de autentificación",
        text: "Le hemos enviado un mensaje con el código para autentificarse a su correo electrónico", 
        input: 'number',            
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: false,
        confirmButtonText: 'Acceder',
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true, 
        showCloseButton: true,
        allowOutsideClick: () => !swal.isLoading()
      }).then((result) => {
        resolve(result);
      });  
    });
  }

  lanzarNotificacionDescargarFicheros(nombreCarpeta:string){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: 'Descargando..',
        html: 'Se están descargando los informes de la carpeta <b>' + nombreCarpeta + '</b>',
        timer: 30000,
        timerProgressBar: true,
        
        didOpen: () => {
          resolve("ok");
        }
      }).then((result) => {
        
      }); 
    });
  }

  lanzarNotificacionRestableciendoContrasena(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: 'Restableciendo...',
        html: 'Estamos restableciendo su contraseña, espere unos segundos...',
        timer: 20000,
        timerProgressBar: true,
        
        didOpen: () => {
          resolve("ok");
        }
      }).then((result) => {
        
      }); 
    });
  }

  lanzarAlertContrasenaNocumplePoliticas(){
    swal.fire({
      customClass: {
        popup: 'modalPopUp',
      },
      buttonsStyling: true,
      title: 'Contraseña Inválida',
      html: "La contraseña debe de seguir las siguientes politicas: <ul><li>Minimo 8 caracteres</li><li>Maximo 15</li><li>Al menos una letra mayúscula</li><li>Al menos una letra minucula</li><li>Al menos un dígito</li><li>No espacios en blanco</li><li>Al menos 1 caracter especial</li></ul>",
      showCancelButton: false,
      confirmButtonText: 'OK',
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: false, 
      showConfirmButton: true,
      showCloseButton: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      
    });
  }

  lanzarNotificacionBorrarUsuario(usuario:UsuarioBBDD){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: "Borrar Usuario",
        text: "¿Estas seguro de que deseas borrar el usuario " + usuario.nombre + " " + usuario.apellido + "?",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#0079c8',
        cancelButtonColor: '#d33',
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true, 
        showCloseButton: true,   
      }).then((result) => {
        resolve(result);
      });  
    });
  }

  lanzarNotificacionConfiguracionInicial(){
    return new Promise<any>( (resolve, reject) => { 
      swal.fire({
        customClass: {
          popup: 'modalPopUp',
        },
        title: '¡Es necesario que termines la configuración correspondiente!',
        html: `
          <p><b>Sino David no sabrá quién eres y tendrás tu multita correspondiente €</b></p>
          <input id="swal-input1" class="swal2-input" placeholder="Nombre">
          <input id="swal-input2" class="swal2-input" placeholder="Dorsal">
          <select id="swal-input3" class="swal2-input">
            <option value="portero">Portero</option>
            <option value="defensa">Defensa</option>
            <option value="centrocampista">Centrocampista</option>
            <option value="delantero">Delantero</option>
          </select>
        `,
        inputValidator: () => {
          if (!document.getElementById('swal-input1')['value']) {
            return 'Debes ingresar un nombre';
          }
          if (!document.getElementById('swal-input2')['value']) {
            return 'Debes ingresar un dorsal';
          }
          if (!document.getElementById('swal-input3')['value']) {
            return 'Debes seleccionar una posición';
          }
        },
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const nombre = document.getElementById('swal-input1')['value'];
          const dorsal = document.getElementById('swal-input2')['value'];
          const posicion = document.getElementById('swal-input3')['value'];
          const usuarioNuevo = {
              nombre,
              dorsal,
              posicion
            };


          return usuarioNuevo;

        },
        allowOutsideClick: false,
      }).then((usuario) => {
        resolve(usuario);
      });
    });
  }

  

}
