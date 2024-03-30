import * as PIXI from 'pixi.js';
import { Boton } from './boton';

export class PantallaInfo {
    private app: PIXI.Application;
    private infoContainer: PIXI.Container;
    private textContainer: PIXI.Container; // Agregado
    private maskHeight: number; // Agregado
    private texto: PIXI.Text; // Agregado
    private startY: number = 0;
    private scrollSpeed: number = 0;
    bloqueo: any;
    private cerrarCallback: () => void;


    constructor(app: PIXI.Application, cerrarCallback: () => void) {
        this.app = app;
        // Crear un contenedor para todos los elementos de la pantalla de información
        this.infoContainer = new PIXI.Container();
        this.cerrarCallback = cerrarCallback;

        // Por defecto, no lo añadimos al stage hasta que sea necesario
    }

    mostrar(): void {
        // Capa de bloqueo
        const bloqueo = new PIXI.Graphics();
        bloqueo.beginFill(0x000000, 0); // Completamente transparente
        bloqueo.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        bloqueo.endFill();
        bloqueo.interactive = true; // Importante para capturar y bloquear los clics
        this.app.stage.addChild(bloqueo);

        // Ahora agregamos infoContainer encima de la capa de bloqueo
        this.app.stage.addChild(this.infoContainer);
        this.crearFondo();
        this.crearTexto();
        this.crearBotonCerrar();

        // Guarda la capa de bloqueo para poder removerla luego
        this.bloqueo = bloqueo;
    }

    // Modifica el método ocultar para llamar al callback
    ocultar(): void {
        this.app.stage.removeChild(this.infoContainer);
        this.app.stage.removeChild(this.bloqueo); // Elimina la capa de bloqueo
        if (this.cerrarCallback) {
            this.cerrarCallback();
        }
    }

    private crearFondo(): void {
        // Opcional: crear un fondo semi-transparente u opaco para la pantalla de info
        const fondo = new PIXI.Graphics();
        fondo.beginFill(0x000000, 0.5); // color negro con transparencia
        fondo.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        fondo.endFill();

        this.infoContainer.addChild(fondo);
    }

    private crearTexto(): void {
        const descripcion = `¡Bienvenido a la Ruleta de la Suerte!
  
  Con cada consumición, obtienes una oportunidad de girar la ruleta. Aquí, la fortuna decide si te llevas desde un "nada" hasta una codiciada Mystery Box.
  
  Cada giro es una nueva aventura. ¿Serás el próximo en descubrir los tesoros que aguardan?
  
  Esta experiencia promete emoción y sorpresas en cada momento. ¿Te atreves a dejar que la suerte decida tu destino?
  
  **Creado por JAC**`;

        // Crear y configurar el texto de la información
        const texto = new PIXI.Text(descripcion, {
            fontFamily: 'Arial',
            fontSize: 18, // Tamaño de fuente reducido
            fill: 0xffffff,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this.app.screen.width * 0.8, // Ajustar al ancho de la pantalla
        });

        texto.x = this.app.screen.width / 2;
        texto.y = (this.app.screen.height - texto.height) + texto.height/4; // Ajustar posición Y basado en la altura del texto
        texto.anchor.set(0.5);

        this.infoContainer.addChild(texto);
    }

    //   private crearTextoConScroll(): void {
    //     const maskHeight = this.app.screen.height * 0.8; // Altura de la máscara
    //     const maskWidth = this.app.screen.width * 0.8; // Ancho de la máscara
    //     const maskX = (this.app.screen.width - maskWidth) / 2; // Posición X de la máscara
    //     const maskY = (this.app.screen.height - maskHeight) / 2; // Posición Y de la máscara

    //     // Crear el contenedor para el texto
    //     const textContainer = new PIXI.Container();

    //     // Crear la máscara para el contenedor de texto
    //     const mask = new PIXI.Graphics();
    //     mask.beginFill(0xffffff);
    //     mask.drawRect(maskX, maskY, maskWidth, maskHeight);
    //     mask.endFill();

    //     // Aplicar la máscara al contenedor de texto
    //     textContainer.mask = mask;

    //     // Añadir la máscara al contenedor de información para que se muestre
    //     this.infoContainer.addChild(mask);
    //     this.infoContainer.addChild(textContainer);

    //     const descripcion = `¡Bienvenido a la Ruleta de la Suerte!

    //     Con cada consumición, obtienes una oportunidad de girar la ruleta. Aquí, la fortuna decide si te llevas desde un "nada" hasta una codiciada Mystery Box.

    //     Cada giro es una nueva aventura. ¿Serás el próximo en descubrir los tesoros que aguardan?

    //     **Creado por JAC**, esta experiencia promete emoción y sorpresas en cada momento. ¿Te atreves a dejar que la suerte decida tu destino?`;


    //     // Aquí es donde crearías y configurarías tu objeto PIXI.Text
    //     const texto = new PIXI.Text(descripcion, {
    //       fontFamily: 'Arial',
    //       fontSize: 18,
    //       fill: 0xffffff,
    //       align: 'center',
    //       wordWrap: true,
    //       wordWrapWidth: maskWidth,
    //     });

    //     texto.x = maskX;
    //     texto.y = maskY;

    //     textContainer.addChild(texto);

    //     // Guarda referencias para usar en el método de scroll
    //     this.textContainer = textContainer;
    //     this.maskHeight = maskHeight;
    //     this.texto = texto;
    //   }

    //   private habilitarScroll(): void {
    //     this.app.renderer.view.addEventListener('pointerdown', (e: PointerEvent) => {
    //       this.startY = e.clientY; // Asegúrate de que este evento es de tipo PointerEvent
    //       this.app.renderer.view.addEventListener('pointermove', this.onMove);
    //     });

    //     window.addEventListener('pointerup', () => {
    //       this.app.renderer.view.removeEventListener('pointermove', this.onMove);
    //     });
    //   }

    private onMove = (e: PointerEvent): void => {
        if (!e.clientY) return; // Asegúrate de que e.clientY está disponible
        const newY = e.clientY;
        this.scrollSpeed = newY - this.startY;
        this.startY = newY;
        this.scrollTexto();
    };


    private scrollTexto(): void {
        // Limitar el scroll dentro de los límites del texto
        this.textContainer.y += this.scrollSpeed;
        if (this.textContainer.y > 0) {
            this.textContainer.y = 0;
        } else if (this.textContainer.y + this.texto.height < this.maskHeight) {
            // Ajustar en base a la altura del texto y de la máscara
            this.textContainer.y = this.maskHeight - this.texto.height;
        }
    }

    private crearBotonCerrar(): void {
        const botonCerrar = new Boton("VOLVER", 0, 0, () => console.log("VOLVER"));
        botonCerrar.x = 10;
        botonCerrar.y = 20;

        botonCerrar.on('pointerdown', () => this.ocultar());

        this.infoContainer.addChild(botonCerrar);
    }
}