import * as PIXI from 'pixi.js';
import { Segmento } from './segmento'; // Ajusta la ruta de importación según sea necesario


export class Ruleta {
    private app: PIXI.Application;
    private radio: number;
    private centro: { x: number; y: number };
    private segmentos: number;
    private segmentosInstancias: Segmento[] = []; // Cambiado para almacenar instancias de Segmento
  
    constructor(app: PIXI.Application, radio: number, centro: { x: number; y: number }) {
      this.app = app;
      this.radio = radio;
      this.centro = centro;
      this.segmentos = 0;
    }
  
    generarRuleta(premios: any[]): void { // Tipo any temporalmente, considera definir una interfaz para 'premios'
        this.segmentos = premios.length;
        const imagenesURLs = premios.map(p => p.img);
        const colores = premios.map(p => p.color); // Asumiendo que quieres usar el color aquí
        this.dividirEnSegmentos(imagenesURLs, colores);
      }
  
      private dividirEnSegmentos(imagenesURLs: string[], colores: number[]): void {
        this.limpiarSegmentos();
        
        for (let i = 0; i < this.segmentos; i++) {
          const anguloInicio = (2 * Math.PI / this.segmentos) * i;
          const anguloFin = (2 * Math.PI / this.segmentos) * (i + 1);
          const imagenURL = imagenesURLs[i]; // Ahora directamente relacionado con 'premios'
          const color = colores[i] || Math.random() * 0xFFFFFF; // Usa el color si está definido, sino uno aleatorio
        
          const segmento = new Segmento(this.app, this.centro, this.radio, anguloInicio, anguloFin, imagenURL);
          this.app.stage.addChild(segmento.container);
          this.segmentosInstancias.push(segmento);
        }
      }
  
    limpiarSegmentos(): void {
      this.segmentosInstancias.forEach(segmento => {
        segmento.destruir(); // Asegúrate de que Segmento maneje correctamente su propia limpieza
      });
      this.segmentosInstancias = [];
    }
}