import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Howl } from 'howler'; // Asegúrate de importar Howl


export class Boton extends PIXI.Container {
    constructor(texto, x, y, callback) {
        super();

        this.x = x;
        this.y = y;
        this.interactive = true;

        const sonidoBoton = new Howl({
            src: ['assets/sounds/button.mp3'], // Asegúrate de poner la ruta correcta al archivo de audio
            volume: 0.5, // Ajusta el volumen según necesites
        });

        // Crear el fondo del botón con PIXI.Graphics
        const fondo = new PIXI.Graphics();
        
        // Dibujar el borde marrón
        fondo.lineStyle(2, 0x8B4513, 1); // Ajusta el grosor, color (marrón en este caso) y alfa del borde
        // Dibujar el relleno dorado
        fondo.beginFill(0xFFD700); // Color dorado para el relleno
        fondo.drawRoundedRect(0, 0, 150, 50, 10); // Ajustar el tamaño y el radio de las esquinas
        fondo.endFill();
        
        this.addChild(fondo);

        // Ajustes de texto
        const estilo = new PIXI.TextStyle({
            fontFamily: '"Comic Sans MS", cursive, sans-serif', // Cambia por tu fuente deseada
            fontSize: 20,
            fill: "black", // Texto en color negro
            align: "center"
        });

        const textoBoton = new PIXI.Text(texto, estilo);
        textoBoton.x = (fondo.width - textoBoton.width) / 2;
        textoBoton.y = (fondo.height - textoBoton.height) / 2;

        this.addChild(textoBoton);

        // Interactividad
        this.on('pointerdown', () => {
            callback(); // Llama al callback proporcionado
            sonidoBoton.play(); // Reproduce el sonido al hacer clic
        });
        this.on('pointerover', () => gsap.to(this.scale, { x: 1.1, y: 1.1, duration: 0.2 }));
        this.on('pointerout', () => gsap.to(this.scale, { x: 1, y: 1, duration: 0.2 }));
    }
}