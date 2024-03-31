import * as PIXI from 'pixi.js';
import * as gsap from 'gsap'


export class EfectoLluvia {
  private app: PIXI.Application;
  private spritesLluvia: PIXI.Sprite[] = [];
  private intervaloLluvia: number;
  private premios: any[];
  private lluviaTweens: any[] = []; // Utiliza `any[]` para simplificar

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

  crearLluviaPremio(texturePremio) {
    this.detenerLluvia(); // Detiene la lluvia y animaciones existentes
    const cantidad = 50; // Número de sprites que quieres que caigan
    for (let i = 0; i < cantidad; i++) {
        const sprite = new PIXI.Sprite(texturePremio);
        sprite.x = Math.random() * this.app.screen.width;
        sprite.y = -300 - Math.random() * this.app.screen.height;
        sprite.width = 60;
        sprite.height = 60;
        
        const tween = gsap.gsap.to(sprite, {
            y: this.app.screen.height + 100,
            ease: 'none',
            repeat: -1,
            delay: i * 0.2,
            duration: 5 + Math.random() * 5,
        });

        this.lluviaTweens.push(tween);
        this.app.stage.addChild(sprite);
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
    this.lluviaTweens.forEach(tween => tween.kill());
    this.lluviaTweens = [];

    if (this.intervaloLluvia) {
      window.clearInterval(this.intervaloLluvia);
      this.intervaloLluvia = null;
    }

    this.spritesLluvia.forEach(sprite => {
      this.app.stage.removeChild(sprite);
      sprite.destroy();
    });
    this.spritesLluvia = [];
  }

}