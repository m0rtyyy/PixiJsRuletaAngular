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
      this.container.sortableChildren = true;

      this.cargarSegmentos();
    }
  
    private cargarSegmentos(): void {
        const texture = PIXI.Assets.get(this.imagenURL);
        if (texture) {
            const sprite = this.crearSprite(texture)
            const mask = this.crearMascara();

            sprite.mask = mask; // Aplica la máscara

            // Carga la textura de madera
            const woodTexture = PIXI.Assets.get("madera");
            if (woodTexture) {
                // Dibuja el borde del segmento con la textura de madera
                const woodBorder = this.crearBorde(woodTexture);
                // No es necesario aplicar una máscara al borde en este caso
                this.container.addChild(woodBorder);
            }

            this.container.addChild(mask);
            this.container.addChild(sprite);

            this.app.stage.addChild(this.container);
        }
    }

    crearSprite(texture: PIXI.Texture): PIXI.Sprite {
      const sprite = new PIXI.Sprite(texture);
  
      // Calcula la escala base para ajustar la imagen dentro del segmento
      const escalaBase = this.radio / Math.max(sprite.width, sprite.height);
  
      // Incrementa la escala para hacer la imagen más grande, según sea necesario
      const factorDeAumento = 1.8; // Modifica este valor para ajustar el tamaño de la imagen
      const escalaAjustada = escalaBase * factorDeAumento;
      sprite.scale.set(escalaAjustada);
  
      // Calcula el punto medio del ángulo del segmento para encontrar la bisectriz
      const puntoMedioAngulo = this.anguloInicio + (this.anguloFin - this.anguloInicio) / 2;
  
      // Calcula la posición del sprite para que esté centrado en la bisectriz del segmento
      // Aquí, no necesitas ajustar por `sprite.width` o `sprite.height` debido al anchor
      sprite.x = this.centro.x + (this.radio * 0.75) * Math.cos(puntoMedioAngulo);
      sprite.y = this.centro.y + (this.radio * 0.75) * Math.sin(puntoMedioAngulo);
  
      sprite.anchor.set(0.5);
      sprite.zIndex = 0; // Asegura que el sprite tenga un zIndex más bajo

  
      return sprite;
  }

    crearMascara(){
      const mask = new PIXI.Graphics();
      mask.beginFill(0xffffff); // El color aquí no importa
      mask.moveTo(this.centro.x, this.centro.y);
      mask.arc(this.centro.x, this.centro.y, this.radio, this.anguloInicio, this.anguloFin);
      mask.lineTo(this.centro.x, this.centro.y);
      mask.endFill();
      return mask
    }

     crearBorde(texture) {
      const woodBorder = new PIXI.Graphics();
      woodBorder.lineStyle({ width: 10, color: 0xFFFFFF, texture: texture }); // Ajusta el ancho del borde según sea necesario
      woodBorder.moveTo(this.centro.x, this.centro.y);
      woodBorder.arc(this.centro.x, this.centro.y, this.radio, this.anguloInicio, this.anguloFin);
      woodBorder.lineTo(this.centro.x, this.centro.y);
      woodBorder.zIndex=1;
      // Configurar el borde aquí
      // Nota: PIXI.Graphics.lineStyle no soporta texturas directamente en PixiJS v5.
      // Para efectos avanzados como bordes con textura, considera usar sprites o meshes.
      return woodBorder;
  }


    public destruir(): void {
      this.container.destroy({ children: true, texture: true, baseTexture: true });
    }
}