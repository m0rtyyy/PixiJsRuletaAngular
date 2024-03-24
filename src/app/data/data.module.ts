import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Routing
import { dataRoutingModule } from './data-routing.module';
// -------------------

// Modulo Paginacion
import { NgxPaginationModule } from 'ngx-pagination';
// -------------------

// Prime Ng
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {ImageModule} from 'primeng/image';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {FileUploadModule} from 'primeng/fileupload';
import {CheckboxModule} from 'primeng/checkbox';

// ----------------

// Graficos
// import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';

// ----------------

// Componentes
import { MenuComponent } from './components/menu/menu.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { EditarRpeUsuarioComponent } from './components/editar-rpe-usuario/editar-rpe-usuario.component';
import { GraficaRpeComponent } from './components/grafica-rpe/grafica-rpe.component';


//Juegos



// Paginas
import { InicioComponent } from './pages/inicio/inicio.component';

//ADMIN


//JUGADORES


import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



// import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';
// import { FiltroGlobalComponent } from './components/filtro-global/filtro-global.component';
// import { TrackingComponent } from './pages/tracking/tracking.component';
// import { DisenaTablaComponent } from './pages/disena-tabla/disena-tabla.component';
// import { PreguntasAbiertasComponent } from './pages/preguntas-abiertas/preguntas-abiertas.component';
// import { AlertasComponent } from './pages/alertas/alertas.component';
// import { GestorInformesComponent } from './pages/gestor-informes/gestor-informes.component';
// import { ControlCampoComponent } from './pages/control-campo/control-campo.component';
// import { AyudaComponent } from './pages/ayuda/ayuda.component';
// import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
// import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
// import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
// import { ModalGestionarAlertaComponent } from './components/modal-gestionar-alerta/modal-gestionar-alerta.component';
// import { InicioComponent } from './pages/inicio/inicio.component';
// import { CargandoComponent } from './components/cargando/cargando.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { HeaderComponent } from './components/header/header.component';
// import { FiltrosComponent } from './components/filtros/filtros.component';
// import { FooterComponentComponent } from './components/footer-component/footer-component.component';
// import { ModalPersonalizarUsuarioComponent } from './components/modal-personalizar-usuario/modal-personalizar-usuario.component';
// import { ModalGestionarAlertaMinComponent } from './components/modal-gestionar-alerta-min/modal-gestionar-alerta-min.component';
// import { DisenaGraficoComponent } from './pages/disena-grafico/disena-grafico.component';
// import { BaseEncuestaComponent } from './pages/base-encuesta/base-encuesta.component';
// import { filtroPreguntaComponent } from './components/filtro-pregunta/filtro-pregunta.component';
// import { AnalisisTextosComponent } from './pages/analisis-textos/analisis-textos.component';
// import { AnalisisTextosKeyphrasesComponent } from './pages/analisis-textos-keyphrases/analisis-textos-keyphrases.component';
// import { FiltroGlobalTextAnalyticsComponent } from './components/filtro-global-text-analytics/filtro-global-text-analytics.component';
// import { ModalAnalisisTextoComponent } from './components/modal-analisis-texto/modal-analisis-texto.component';
// import { DescargaRespComponent } from './pages/descarga-resp/descarga-resp.component';

// ----------------

// Pipes
import { SiNoCambiarPipe } from '../core/pipes/si-no-cambiar.pipe';



// --------------------

//Modulo del Traductor
import { TranslateModule } from '@ngx-translate/core';
// --------------------


// Dragula
import { DragulaModule } from 'ng2-dragula';
// --------------------

// swiper
import { SwiperModule } from 'swiper/angular';
import { RuletaComponent } from './games/ruleta/ruleta.component';



// ---------------------

@NgModule({
    declarations: [
      //Componentes
      InicioComponent,
      MenuComponent,
      PageNotFoundComponent,
      CargandoComponent,
      EditarRpeUsuarioComponent,
      GraficaRpeComponent,
      //PIPES
      SiNoCambiarPipe,
      RuletaComponent,
  ],
    imports: [
      CommonModule,
      dataRoutingModule,
      FormsModule,
      NgxPaginationModule,
      NgxChartsModule,
      CardModule,
      MenubarModule,
      FileUploadModule,
      DialogModule,
      ImageModule,
      MultiSelectModule,
      ButtonModule,
      DropdownModule,
      TableModule,
      ToastModule,
      PanelModule,
      CalendarModule,
      SliderModule,
      ContextMenuModule,
      ProgressBarModule,
      InputTextModule,
      InputSwitchModule,
      InputTextareaModule,
      TooltipModule,
      CheckboxModule,
      TranslateModule,
      DragulaModule.forRoot(),
      SwiperModule,
      HighchartsChartModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })

      
    ],
    providers: [
      { provide: HighchartsChartModule, useFactory: () => [ more, exporting ] } // add as factory to your providers

    ],
    exports: []
  })
  export class dataModule { }
