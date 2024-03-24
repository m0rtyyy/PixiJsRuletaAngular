import { DatePipe } from '@angular/common';
import { Component,EventEmitter, OnInit, Input, ViewChild,Output } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GraficasService } from '../../services/graficas.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'appA-grafica-rpe',
  templateUrl: './grafica-rpe.component.html',
  styleUrls: ['./grafica-rpe.component.scss']
})
export class GraficaRpeComponent {
  @Input() arrayGrafica:any[];

  graficaRPE:any;
  options:any;


  constructor(private data:DataServiceService,
    private graficas:GraficasService) { }

    ngOnInit(): void {
      this.montarGrafica();
    }

    montarGrafica(){
       this.graficaRPE= this.graficas.funcionGraficoRPE(this.arrayGrafica);

    }

}
