import { Injectable } from '@angular/core';

// ECharts
import { EChartsOption } from 'echarts';
// ---------------

// Graficos
import { Options } from 'highcharts'
// ---------------

// Highchart

import * as Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);
declare var require: any;
//----------

@Injectable({
  providedIn: 'root'
})

export class GraficasService {

  options:any;

  constructor() { }

  funcionGraficoRPE(datos:any){
    var data:any[] = []; 
    var dataColumns:string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo'];

    var minInterval:number = 5;
    var min:number = 0;
    var max:number = 1000; 
    var medias:any;
    var mediasRPE:any;
    
    var arrayTiempoSesion:any=[];
    var arrayMediasRPE:any=[];
    var arrayCargas:any=[];
    var arrayJugadores:any=[];

    datos.forEach(element => {
      //CARGAMOS LOS TIEMPOS DE SESION.
      arrayTiempoSesion.push(element.tiempo_sesion);
      var mediarpe:number = ((element.media_cardio/element.jugadores_reales_respondidos)+(element.media_piernas/element.jugadores_reales_respondidos))/2;
      if(Number.isNaN(mediarpe)){
        mediarpe=0;
      }
      arrayMediasRPE.push(mediarpe);
      var jugadores= element.jugadores_reales_respondidos;
      if(Number.isNaN(jugadores)){
        jugadores=0;
      }
      arrayJugadores.push(jugadores);

    });
    if(arrayTiempoSesion.length==arrayMediasRPE.length){
      for (let i = 0; i < arrayTiempoSesion.length; i++) {
        arrayCargas[i]= arrayTiempoSesion[i]*arrayMediasRPE[i]      
      }
      
    }
    var graficoLineaTiempo:any = {
      lineStyle: {
        width: 3,
        shadowColor: '#b6b6b6',
        shadowBlur: 7,
        shadowOffsetY: 6
      },
      symbolSize: 10,
      name : '',          
      type : 'spline',
      data : arrayTiempoSesion,
      stack: 'Total',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        fontWeight: 400,
        formatter: (params) => {
            return "TºSESION: "+ params.data+" min";
        }
      }
    };


    var graficoBarra:any = {
      lineStyle: {
        width: 3,
        shadowColor: '#b6b6b6',
        shadowBlur: 7,
        shadowOffsetY: 6
      },
      symbolSize: 10,
      name : '',          
      type : 'bar',
      data : arrayMediasRPE,
      stack: 'Total',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        fontWeight: 400,
        formatter: (params) => {
            return "MEDIA RPE: "+ params.data+" ";
        }
      }
    };

    var graficoLineaCarga:any = {
      lineStyle: {
        width: 3,
        shadowColor: '#b6b6b6',
        shadowBlur: 7,
        shadowOffsetY: 6
      },
      symbolSize: 10,
      name : '',          
      type : 'spline',
      data : arrayCargas,
      stack: 'Total',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        fontWeight: 400,
        formatter: (params) => {
            return "TºSESION: "+ params.data+" min";
        }
      }
    };

    data.push(graficoLineaTiempo);
    data.push(graficoLineaCarga);
    data.push(graficoBarra);

    const colores = ['#00a800', '#0B58A6', '#F4900F', "#f40f0f"];
    
    this.options = {
      title: {
        text: 'Gráfico Semanal',
        textStyle: {
          color: "#fff"
        },
      },
      
      legend: {
        data: ['Tiempo Sesión', 'Media RPE', 'Carga', 'Jugadores'],
        align: 'left',
        textStyle: {
          color: "#fff"
        },
      },
      color:colores,
      tooltip: {},
      xAxis: {
        data: dataColumns,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Cargas',
          min:0,
          interval: 200,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine:{
            textStyle: {
              color: "#fff"
            },
          }
        },
        {
          type: 'value',
          name: 'Media RPE',
          min: 0,
          max: 10,
          interval: 2,
          axisLabel: {
            formatter: '{value}'
          },
          silent: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: colores[1]
            }
          },
          
        },
        {
          type: 'value',
          name: 'Jugadores',
          min: 0,
          max: 22,
          axisLabel: {
            formatter: '{value}'
          },
          silent: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: colores[3]
            }
          },
          offset: 80
        }
      ],
      series: [
        {
          name: 'Tiempo Sesión',
          type: 'line',
          data: arrayTiempoSesion,
          z:2,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Media RPE',
          type: 'bar',
          data: arrayMediasRPE,
          yAxisIndex: 1,
          z:1,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'Carga',
          type: 'line',
          areaStyle:{},
          smooth: true,
          data: arrayCargas,
          z:0,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'Jugadores',
          type: 'line',
          data: arrayJugadores,
          yAxisIndex: 2,
          z:3,
          animationDelay: (idx) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    
    


    return {
      grafico: this.options,
      tabla: datos,
      datosAdicionales: {
        nombre: "Gráfico de Líneas RPE"
      }
    };
   
  }
}
