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
     premios:any;
     premiosGanadores = [1, 2, 8, 3, 4]; // Por ejemplo, los id de los segmentos
     // Agrega esta variable a tu clase Ruleta para rastrear la posición final después de cada giro.
     anguloActual: number = 0;

    
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
      this.premios = premios;
      this.segmentos = premios.length;
      const imagenesURLs = premios.map(p => p.img);
      const colores = premios.map(p => p.color);
      this.crearSegmentos(imagenesURLs, colores);
      this.flecha = new Flecha(this.app, this.centro, this.radio);
      console.log(this.segmentosInstancias);
      console.log(this.getSegmentoApuntadoPorFlecha());
      


      

      // No necesitas crear la Flecha aquí si va a ser un elemento estático fuera del contenedor de la ruleta
      // const flecha = new Flecha(this.app, this.centro, this.radio);
  }

  //Crea los segmentos que conforma la ruleta
  private crearSegmentos(imagenesURLs: string[], colores: number[]): void {
    this.limpiarSegmentos();

    const anguloTotal = 2 * Math.PI; // Total de 360 grados en radianes.
    const anguloPorSegmento = anguloTotal / this.segmentos;

    // Ajustamos para que la bisectriz del primer segmento apunte hacia abajo (π/2 radianes)
    // Esto significa que el primer segmento debería estar orientado de tal manera que su punto medio
    // (bisectriz) esté alineado con π/2 radianes. Sin embargo, como la flecha apunta hacia abajo, 
    // queremos que este punto medio esté alineado con la dirección de la flecha.
    for (let i = 0; i < this.segmentos; i++) {
        // Calculamos los ángulos de inicio y fin para cada segmento asegurando la correcta orientación.
        const anguloInicio = i * anguloPorSegmento;
        const anguloFin = (i + 1) * anguloPorSegmento;

        const imagenURL = imagenesURLs[i];

        // Creamos el segmento con los ángulos calculados.
        const segmento = new Segmento(this.app, {x: 0, y: 0}, this.radio, anguloInicio, anguloFin, imagenURL, i);
        this.container.addChild(segmento.container);
        this.segmentosInstancias.push(segmento);
    }

    // Ajustar la posición del contenedor de la ruleta al centro especificado.
    this.container.x = this.centro.x;
    this.container.y = this.centro.y;

    // Asegurar que la ruleta esté rotada adecuadamente para alinear la bisectriz del primer segmento
    // con la dirección en que apunta la flecha. Esto puede requerir rotar el contenedor de la ruleta.
    this.container.rotation = -Math.PI / 2 - (anguloPorSegmento /2);
}

//Obtiene el segmento el cual está apuntando la flecha (situada a 90º del centro de la ruleta)
  getSegmentoApuntadoPorFlecha(): Segmento | null {
    // Asume que la flecha apunta directamente hacia abajo en la posición inicial
    // Calcula el ángulo absoluto de la flecha considerando la rotación del contenedor
    const anguloAbsolutoFlecha = (Math.PI * 3 / 2 ) % (Math.PI * 2);

    for (let segmento of this.segmentosInstancias) {

      // Calcula los ángulos de inicio y fin absolutos del segmento considerando la rotación del contenedor
      let anguloInicioAbsoluto = (segmento.anguloInicio + this.container.rotation) % (Math.PI * 2);
      let anguloFinAbsoluto = (segmento.anguloFin + this.container.rotation) % (Math.PI * 2);



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


girarRuleta(vueltas: number): void {
  let premioID = this.obtenerSiguientePremio(); // Devuelve el ID del premio
  let indiceSegmentoObjetivo = this.premios.findIndex(p => p.id === premioID);
  
  // Calculamos el ángulo por segmento basado en el número total de premios.
  const anguloPorSegmento = (2 * Math.PI) / this.premios.length;

  // El ángulo objetivo ajusta para que la flecha termine en la bisectriz del segmento ganador.
  // Consideramos el ángulo inicial de la ruleta para que la flecha apunte al inicio del primer segmento.
  let anguloObjetivo = -Math.PI / 2 + anguloPorSegmento * (-(indiceSegmentoObjetivo)) - anguloPorSegmento / 2;

  // Añadimos vueltas extra para hacer el giro más interesante.
  anguloObjetivo += vueltas * 2 * Math.PI;

  // Aseguramos que el giro sea en sentido horario ajustando la rotación final.
  let diferenciaAngulo = anguloObjetivo - (this.container.rotation % (2 * Math.PI));
  if (diferenciaAngulo < 0) diferenciaAngulo += 2 * Math.PI;

  let duracion = 5; // Duración de la animación en segundos.
  let tiempoInicial = Date.now();
  let anguloInicial = this.container.rotation;

  const girar = () => {
    let ahora = Date.now();
    let tiempoTranscurrido = (ahora - tiempoInicial) / 1000; // Convertimos a segundos.
    let fraccion = tiempoTranscurrido / duracion;

    if (fraccion >= 1) {
      this.container.rotation = anguloInicial + diferenciaAngulo; // Asegura terminar en el ángulo objetivo.
      this.app.ticker.remove(girar);
      console.log("Animación completada");
      return;
    }

    // Aplicamos una función de easing para suavizar la animación.
    let posicionActual = anguloInicial + diferenciaAngulo * (1 - Math.pow(1 - fraccion, 3));
    this.container.rotation = posicionActual;
  };

  this.app.ticker.add(girar);
}


//Obtiene de nuestro array de premios el segmento que tiene que salir en la tirada
  obtenerSiguientePremio(): number | null {
    if (this.premiosGanadores.length > 0) {
      const siguientePremio = this.premiosGanadores[0];
      this.premiosGanadores.shift(); // Elimina el primer elemento del array
      return siguientePremio;
    } else {
      return null; // No hay más premios en el array
    }
  }
  
  limpiarSegmentos(): void {
    this.segmentosInstancias.forEach(segmento => {
        segmento.destruir();
    });
    this.segmentosInstancias = [];
  }
}