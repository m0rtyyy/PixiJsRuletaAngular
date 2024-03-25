import * as PIXI from 'pixi.js';
import { Segmento } from './segmento'; // Ajusta la ruta de importación según sea necesario
import { Flecha } from './flecha';


export class Ruleta {
     app: PIXI.Application;
     radio: number;
     centro: { x: number; y: number };
     container: PIXI.Container; // Contenedor para todos los elementos de la ruleta
     segmentos: number;
     segmentosInstancias: Segmento[] = [];
     flecha: any;
    
    constructor(app: PIXI.Application, radio: number, centro: { x: number; y: number }) {
      this.app = app;
      this.radio = radio;
      this.centro = centro;
      this.segmentos = 0;
      this.container = new PIXI.Container(); // Inicializa el contenedor
      this.container.interactive = true;
      this.app.stage.addChild(this.container); // Añade el contenedor al escenario
    }
  
    generarRuleta(premios: any[]): void {
      this.segmentos = premios.length;
      const imagenesURLs = premios.map(p => p.img);
      const colores = premios.map(p => p.color);
      this.crearSegmentos(imagenesURLs, colores);
      this.flecha = new Flecha(this.app, this.centro, this.radio);

      // No necesitas crear la Flecha aquí si va a ser un elemento estático fuera del contenedor de la ruleta
      // const flecha = new Flecha(this.app, this.centro, this.radio);
  }

  private crearSegmentos(imagenesURLs: string[], colores: number[]): void {
    this.limpiarSegmentos();
    // Centro imaginario de la ruleta en el contenedor
    const centroX = 0; // El contenedor girará alrededor de este punto
    const centroY = 0; // El contenedor girará alrededor de este punto

    for (let i = 0; i < this.segmentos; i++) {
        const anguloInicio = (2 * Math.PI / this.segmentos) * i;
        const anguloFin = (2 * Math.PI / this.segmentos) * (i + 1);
        const imagenURL = imagenesURLs[i];
        const color = colores[i] || Math.random() * 0xFFFFFF;
        
        const segmento = new Segmento(this.app, { x: centroX, y: centroY }, this.radio, anguloInicio, anguloFin, imagenURL);
        this.container.addChild(segmento.container); // Añade el contenedor del segmento al contenedor de la ruleta
        this.segmentosInstancias.push(segmento);
    }
    this.container.x = this.centro.x;
    this.container.y = this.centro.y;
}

getSegmentoApuntadoPorFlecha(): Segmento | null {
  // Asume que la flecha apunta directamente hacia abajo en la posición inicial
  // Calcula el ángulo absoluto de la flecha considerando la rotación del contenedor
  const anguloAbsolutoFlecha = (Math.PI * 3 / 2 ) % (Math.PI * 2);
  console.log(anguloAbsolutoFlecha);
  
  for (let segmento of this.segmentosInstancias) {
    console.log(segmento);
    
    // Calcula los ángulos de inicio y fin absolutos del segmento considerando la rotación del contenedor
    let anguloInicioAbsoluto = (segmento.anguloInicio + this.container.rotation) % (Math.PI * 2);
    let anguloFinAbsoluto = (segmento.anguloFin + this.container.rotation) % (Math.PI * 2);
    console.log(anguloInicioAbsoluto,anguloFinAbsoluto);


    // Asegúrate de que los ángulos están en el rango [0, 2 * PI]
    if (anguloInicioAbsoluto < 0) anguloInicioAbsoluto += Math.PI * 2;
    if (anguloFinAbsoluto < 0) anguloFinAbsoluto += Math.PI * 2;

    // Si el anguloAbsolutoFlecha está entre anguloInicioAbsoluto y anguloFinAbsoluto, hemos encontrado el segmento
    if (anguloInicioAbsoluto < anguloFinAbsoluto) {
      if (anguloAbsolutoFlecha >= anguloInicioAbsoluto && anguloAbsolutoFlecha <= anguloFinAbsoluto) {
        return segmento;
      }
    } else {
      // Este bloque maneja el caso donde el segmento cruza el ángulo 0 (360 grados)
      if (anguloAbsolutoFlecha >= anguloInicioAbsoluto || anguloAbsolutoFlecha <= anguloFinAbsoluto) {
        return segmento;
      }
    }
  }

  return null;
}

  girarRuleta(duracion: number): void {
    // Tiempo total de la animación en milisegundos
    let tiempoRestante = duracion;
    
    // Velocidad inicial y desaceleración calculada para terminar exactamente en 'duracion' ms
    let velocidadRotacion = Math.PI * 10; // Velocidad inicial en radianes por segundo, ajusta a tu preferencia
    const desaceleracionPorSegundo = velocidadRotacion / duracion; // Calcula la desaceleración necesaria

    const girar = (delta) => {
        // Calcula el cambio de tiempo desde el último frame
        const deltaTiempo = this.app.ticker.elapsedMS;
        tiempoRestante -= deltaTiempo;
        
        // Disminuye la velocidad basado en la desaceleración
        velocidadRotacion -= desaceleracionPorSegundo * deltaTiempo;
        
        // Asegura que la velocidad no sea negativa
        velocidadRotacion = Math.max(0, velocidadRotacion);

        // Aplica la rotación al contenedor de la ruleta
        this.container.rotation += velocidadRotacion * deltaTiempo / 1000; // Convierte de ms a s
        
        // Verifica si el tiempo de animación ha terminado
        if (tiempoRestante <= 0) {
            this.app.ticker.remove(girar);
            // Aquí puedes manejar el evento de finalización, como determinar el segmento ganador
            var segmentoGanador = this.getSegmentoApuntadoPorFlecha();
            console.log(segmentoGanador.imagenURL);
            
        }
    };

    // Agrega la función `girar` al ticker de PixiJS para animar la ruleta
    this.app.ticker.add(girar);
}


  
  limpiarSegmentos(): void {
    this.segmentosInstancias.forEach(segmento => {
        segmento.destruir();
    });
    this.segmentosInstancias = [];
  }
}