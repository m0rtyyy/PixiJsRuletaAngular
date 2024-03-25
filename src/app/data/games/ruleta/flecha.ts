import * as PIXI from 'pixi.js';

export class Flecha {
    private app: PIXI.Application;
    private centro: { x: number; y: number };
    private radio: number;
    public container: PIXI.Container;
    private imagenURL: string; // URL de la imagen de la flecha
  
    constructor(app: PIXI.Application, centro: { x: number; y: number }, radio: number) {
        this.app = app;
        this.centro = centro;
        this.radio = radio;
        this.imagenURL = 'flecha'; // Guarda la URL de la imagen
        this.container = new PIXI.Container(); // Contenedor para la flecha

        this.cargarImagenFlecha();
    }
  
    private cargarImagenFlecha(): void {
        const texture = PIXI.Assets.get(this.imagenURL); // Asegúrate de que la textura ya esté cargada o usa PIXI.Loader para cargarla
        if (texture) {
            const spriteFlecha = new PIXI.Sprite(texture);

            // Ajusta la escala y orientación de la flecha si es necesario
            spriteFlecha.scale.set(0.5); // Ajusta según el tamaño de tu imagen
            spriteFlecha.anchor.set(0.5, 0.5); // Centra la imagen

            // Posiciona la flecha en el extremo del radio y ajusta según sea necesario
            spriteFlecha.x = this.centro.x;
            spriteFlecha.y = this.centro.y - this.radio+20;

            // Añade la flecha al contenedor
            this.container.addChild(spriteFlecha);

            // Añade el contenedor al escenario de la aplicación
            this.app.stage.addChild(this.container);
        }
    }
}