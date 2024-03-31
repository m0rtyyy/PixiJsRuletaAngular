import * as PIXI from 'pixi.js';
import { Boton } from './boton';

export class PantallaIntro {
    private app: PIXI.Application;
    private fondo: any;
    private botonJugar: any;
    private botonInfo: any;
    private botonSalir: any;

    constructor(app: PIXI.Application, jugarCallback: () => void, infoCallback: () => void, salirCallback: () => void) {
        this.app = app;
        this.crearFondo();
        this.crearBotones(jugarCallback, infoCallback, salirCallback);
    }

    private crearFondo() {
        const texture = PIXI.Assets.get('pantcarga');
        if (texture) {
            // Creamos un Sprite usando la textura del fondo.
            this.fondo = new PIXI.Sprite(texture);
    
            // Opcional: ajustar el tamaño del sprite al tamaño de la pantalla.
            // Esto puede depender de cómo desees que se muestre la imagen de fondo.
            this.fondo.width = this.app.screen.width;
            this.fondo.height = this.app.screen.height;
    
            // Añadir el sprite del fondo al escenario.
            this.app.stage.addChild(this.fondo);
        } else {
            // Si la textura no está disponible, podrías optar por crear un fondo sólido o manejar el error de alguna manera.
            console.error('Textura de fondo no encontrada');
        }
    }

    private crearBotones(jugarCallback: () => void, infoCallback: () => void, salirCallback: () => void) {
        const estilo = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 'white',
            align: 'center'
        });


        // Botón JUGAR
        this.botonJugar = new Boton("JUGAR", 0,0, () => console.log("Jugar!"));
        this.botonJugar.x = (this.app.screen.width - this.botonJugar.width) / 2;
        this.botonJugar.y = this.app.screen.height / 2 - 100
        this.app.stage.addChild(this.botonJugar);

        // Botón INFO
        this.botonInfo = new Boton("INFO", 0,0, () => console.log("Jugar!"));
        this.botonInfo.x = (this.app.screen.width - this.botonInfo.width) / 2;
        this.botonInfo.y = this.app.screen.height / 2;
        this.app.stage.addChild(this.botonInfo);

        // Botón SALIR
        this.botonSalir = new Boton("SALIR", 0,0, () => console.log("Jugar!"));
        this.botonSalir.x = (this.app.screen.width - this.botonSalir.width) / 2;
        this.botonSalir.y = this.app.screen.height / 2 + 100;
        this.app.stage.addChild(this.botonSalir);

        // Añadir eventos a los botones
        this.botonJugar.on('pointerdown', jugarCallback);
        this.botonInfo.on('pointerdown', infoCallback);
        this.botonSalir.on('pointerdown', salirCallback);
    }

    public ocultar() {
        // this.fondo.visible = false;
        this.botonJugar.visible = false;
        this.botonInfo.visible = false;
        this.botonSalir.visible = false;
    }

    public mostrar() {
        // this.fondo.visible = true;
        this.botonJugar.visible = true;
        this.botonInfo.visible = true;
        this.botonSalir.visible = true;
    }


    


}