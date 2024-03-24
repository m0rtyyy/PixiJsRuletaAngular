import * as PIXI from 'pixi.js';

export class Segmento {
    public container: PIXI.Container;
    private app: PIXI.Application;
    private centro: { x: number; y: number };
    private radio: number;
    private anguloInicio: number;
    private anguloFin: number;
    private imagenURL: string;
  
    constructor(app: PIXI.Application, centro: { x: number; y: number }, radio: number, anguloInicio: number, anguloFin: number, imagenURL: string) {
      this.app = app;
      this.centro = centro;
      this.radio = radio;
      this.anguloInicio = anguloInicio;
      this.anguloFin = anguloFin;
      this.imagenURL = imagenURL;
      this.container = new PIXI.Container(); // Un contenedor para mantener el sprite y la máscara juntos

      this.cargarImagen();
    }
  
    private cargarImagen(): void {
        const texture = PIXI.Assets.get(this.imagenURL);
        if (texture) {
            const sprite = new PIXI.Sprite(texture);

            // Ajuste simplificado del tamaño del sprite
            const escala = this.radio / Math.max(sprite.width, sprite.height);
            sprite.scale.set(escala);
    
            // Posicionamiento simplificado basado en el centro y el radio
            sprite.x = this.centro.x + this.radio * Math.cos(this.anguloInicio + (this.anguloFin - this.anguloInicio) / 2) - sprite.width / 2;
            sprite.y = this.centro.y + this.radio * Math.sin(this.anguloInicio + (this.anguloFin - this.anguloInicio) / 2) - sprite.height / 2;
    

            const mask = new PIXI.Graphics();
            mask.beginFill(0xffffff); // El color aquí no importa
            mask.moveTo(this.centro.x, this.centro.y);
            mask.arc(this.centro.x, this.centro.y, this.radio, this.anguloInicio, this.anguloFin);
            mask.lineTo(this.centro.x, this.centro.y);
            mask.endFill();

            sprite.mask = mask; // Aplica la máscara

            // Carga la textura de madera
            const woodTexture = PIXI.Assets.get("madera");
            if (woodTexture) {
                // Dibuja el borde del segmento con la textura de madera
                const woodBorder = new PIXI.Graphics();
                woodBorder.lineStyle({ width: 5, color: 0xFFFFFF, texture: woodTexture }); // Ajusta el ancho del borde según sea necesario
                woodBorder.moveTo(this.centro.x, this.centro.y);
                woodBorder.arc(this.centro.x, this.centro.y, this.radio, this.anguloInicio, this.anguloFin);
                woodBorder.lineTo(this.centro.x, this.centro.y);

                // No es necesario aplicar una máscara al borde en este caso
                this.container.addChild(woodBorder);
            }

            this.container.addChild(mask);
            this.container.addChild(sprite);

            this.app.stage.addChild(this.container);
        }
    }
  
    public destruir(): void {
      this.container.destroy({ children: true, texture: true, baseTexture: true });
    }
}