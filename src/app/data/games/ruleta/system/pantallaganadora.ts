import * as PIXI from 'pixi.js';
import { Boton } from './boton';


export class PantallaGanadora {

    app:any;
    premio:any;
    modal:any;
    
    constructor(app, premio) {
        this.app = app;
        this.premio = premio; // Información del premio ganador
        this.modal = new PIXI.Container();
        this.modal.visible = false; // Inicialmente oculto
        this.app.stage.addChild(this.modal);

        this.crearFondoModal();
        this.mostrarInformacionPremio();
    }

    crearFondoModal() {
        // Similar a PantallaInfo, un fondo semi-transparente
        const fondo = new PIXI.Graphics();
        fondo.beginFill(0x000000, 0.5);
        fondo.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        fondo.endFill();
        this.modal.addChild(fondo);
    }

    mostrarInformacionPremio() {
        // Texto o imagen del premio
        const texto = new PIXI.Text(`¡Felicidades! Ganaste ${this.premio.nombre}`, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center',
        });
        texto.x = this.app.screen.width / 2;
        texto.y = this.app.screen.height / 2;
        texto.anchor.set(0.5);

        this.modal.addChild(texto);
    }

    mostrar() {
        this.modal.visible = true;
    }

    ocultar() {
        this.modal.visible = false;
    }
}


