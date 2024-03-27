import * as PIXI from 'pixi.js';

export class EfectoLluvia {
  private app: PIXI.Application;
  private spritesLluvia: PIXI.Sprite[] = [];
  private intervaloLluvia: number;
  private premios: any[];

  constructor(app: PIXI.Application, premios: any[]) {
    this.app = app;
    this.premios = premios;
  }

  crearSpriteLluvia() {
    const premioAleatorio = this.premios[Math.floor(Math.random() * this.premios.length)];
    const texture = PIXI.Assets.get(premioAleatorio.ico);
    if (texture) {
      const sprite = new PIXI.Sprite(texture);
      sprite.x = Math.random() * this.app.screen.width;
      sprite.y = -50; // Inicia fuera de la pantalla
      sprite.width = 60;
      sprite.height = 60; // Inicia fuera de la pantalla
      this.app.stage.addChild(sprite);
      this.spritesLluvia.push(sprite);
    }
  }

  actualizarLluvia(delta: number) {
    this.spritesLluvia.forEach((sprite, index) => {
      sprite.y += 5 * delta;
      if (sprite.y > this.app.screen.height + sprite.height) {
        this.app.stage.removeChild(sprite);
        sprite.destroy();
        this.spritesLluvia.splice(index, 1);
      }
    });
  }

  iniciarLluvia() {
    this.app.ticker.add(this.actualizarLluvia.bind(this));

    this.intervaloLluvia = window.setInterval(() => {
      this.crearSpriteLluvia();
    }, 1000); // Ajusta este valor según la densidad deseada de la lluvia
  }

  detenerLluvia() {
    this.app.ticker.remove(this.actualizarLluvia.bind(this));
    window.clearInterval(this.intervaloLluvia);

    this.spritesLluvia.forEach((sprite) => {
      this.app.stage.removeChild(sprite);
      sprite.destroy();
    });
    this.spritesLluvia = [];
  }
}