import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameConfig } from './system/config';
import { Ruleta } from './ruleta';
import { Howl, Howler } from 'howler';

import { AnimatedSprite, Application, Assets, ResolverAssetsObject, Texture } from 'pixi.js';
import { PantallaIntro } from './system/pantallaInicio';
import { PantallaInfo } from './system/pantallainfo';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.scss'],
})
export class RuletaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ruletaContainer') ruletaContainer: ElementRef;
  private app: PIXI.Application;
  // private loader: Loader = Loader.getInstance();
  parent:any;

  //AJUSTES ESENCIALES
  loadingProgressBar:any;
  container:any;
  loading = 0;
  gameAssets: any;
  pantallaintro:any;
  ruleta:any;
  centroRuletaX:any;
  centroRuletaY:any;
  radioRuleta:any;

  premios:any = GameConfig.premios;





  ngAfterViewInit(): void {
    this.initializePixiApp();
    this.loadResources();

  }

  async loadResources() {
    this.initializeLoadingBar(); // Inicializa la barra de carga
    // Definir todos los assets necesarios
    const assets: PIXI.ResolverAssetsObject = {
      'pantcarga': 'assets/sprites/pantcarga.png',
      'bg': 'assets/sprites/bg.png',
      'madera': 'assets/sprites/madera.jpg',
      'logo':'assets/sprites/logo.png',
      'soundon' : 'assets/sprites/soundon.png',
      'soundoff' : 'assets/sprites/soundoff.png',
      'flecha': 'assets/sprites/flecha.png',
      'mojito': 'assets/sprites/mojito.jpg',
      'mojitoico': 'assets/sprites/mojitoico.png',
      'chupito': 'assets/sprites/chupito.jpg',
      'chupitoico': 'assets/sprites/chupitoico.png',
      'cerveza': 'assets/sprites/cerveza.jpg',
      'cervezaico': 'assets/sprites/cervezaico.png',
      'copa': 'assets/sprites/copa.jpg',
      'copaico': 'assets/sprites/copaico.png',
      'refresco': 'assets/sprites/refresco.jpg',
      'refrescoico': 'assets/sprites/refrescoico.png',
      'tucancion': 'assets/sprites/tucancion.jpg',
      'tucancionico': 'assets/sprites/tucancionico.png',
      'mysterybox': 'assets/sprites/mysterybox.jpg',
      'mysteryboxico': 'assets/sprites/mysteryboxico.png',
      'nada': 'assets/sprites/nada.jpg',
      'tirarBoton': 'assets/sprites/tirarBoton.png',
      'sonidogiro' : 'assets/sounds/click.mp3',

    };

    Assets.addBundle('miJuego', assets);

    // Cargar el bundle y actualizar la barra de progreso con el porcentaje
    this.gameAssets = await Assets.loadBundle('miJuego', (loadingPercentage) => {
        const barWidth = 300; // El mismo ancho definido en initializeLoadingBar
        this.loadingProgressBar.clear();
        this.loadingProgressBar.beginFill(0xFFFFFF); // Color de la barra de progreso
        this.loadingProgressBar.drawRect((this.app.screen.width - barWidth) / 2, (this.app.screen.height - 20) / 2, barWidth * loadingPercentage, 20);
        this.loadingProgressBar.endFill();
    });
    // Una vez cargado todo, puedes eliminar el texto de carga o hacer cualquier otra cosa como iniciar el juego
    this.app.stage.removeChild(this.loadingProgressBar);

    this.pantallaintro = new PantallaIntro(
      this.app,
      () => this.iniciarJuego(), // Aquí defines qué hacer cuando se presiona JUGAR
      () => this.mostrarPantallaInfo(), // INFO callback
      () => console.log('SALIR del juego') // SALIR callback
    );

    this.crearBotonMute();


}

  iniciarJuego() {
    // Aquí puedes llamar a createBackground, crearRuleta, etc.
    // y cualquier otra lógica de inicialización del juego
    this.pantallaintro.ocultar();
    this.createBackground();
    this.crearRuleta();
    this.crearLogo();
    this.crearBotonMute();
  }

  mostrarPantallaInfo(){
    if (this.pantallaintro) {
        this.pantallaintro.ocultar();
    }
    const pantallaInfo = new PantallaInfo(this.app, this.mostrarPantallaIntro.bind(this));
    pantallaInfo.mostrar();
}

  mostrarPantallaIntro() {
    if (this.pantallaintro) {
        this.pantallaintro.mostrar();
    }
  }


  private initializePixiApp(): void {
    this.container = this.ruletaContainer.nativeElement;
    this.app = new PIXI.Application({
      width: this.container.offsetWidth, // Asume el ancho del contenedor
      height: this.container.offsetHeight, // Asume el alto del contenedor
      ...GameConfig.app,
    });
    this.container.appendChild(this.app.view);
    this.resizeApp();


  }

  private resizeApp = (): void => {
    const resize = () => {
      this.parent = this.ruletaContainer.nativeElement;
      this.app.renderer.resize(this.parent.offsetWidth, this.parent.offsetHeight);
  
      // Opcional: Ajusta la ruleta al nuevo tamaño si ya está creada
      if (this.ruleta) {
        this.destruirRuleta();//
        this.crearRuleta(); // Esto ajustará el tamaño y posición de la ruleta
      }
    };
    window.addEventListener('resize', resize);
  
    // Llamar inmediatamente para ajustar al tamaño inicial
    resize();
  }

  initializeLoadingBar() {
    // Configuración de la barra de carga
    const barWidth = 300;
    const barHeight = 20;
    const posX = (this.app.screen.width - barWidth) / 2; // Centrar en pantalla
    const posY = (this.app.screen.height - barHeight) / 2;

    // Fondo de la barra de carga
    const loadingBarBackground = new PIXI.Graphics();
    loadingBarBackground.beginFill(0x000000); // Color de fondo
    loadingBarBackground.drawRect(posX, posY, barWidth, barHeight);
    loadingBarBackground.endFill();
    this.app.stage.addChild(loadingBarBackground);

    // Barra de progreso (inicialmente vacía)
    const loadingProgressBar = new PIXI.Graphics();
    loadingProgressBar.beginFill(0xFFFFFF); // Color de la barra de progreso
    loadingProgressBar.drawRect(posX, posY, 1, barHeight); // Iniciar con un ancho de 1
    loadingProgressBar.endFill();
    this.app.stage.addChild(loadingProgressBar);

    // Guarda la barra de progreso en una propiedad para actualizarla más tarde
    this.loadingProgressBar = loadingProgressBar;
}

  createBackground() {
    const texture = PIXI.Assets.get('bg');
    if (texture) {
        // Asume que el fondo se repite y es más ancho que el contenedor
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT; // Permite que la textura se repita
        const bgSprite = new PIXI.TilingSprite(texture, this.container.offsetWidth, this.container.offsetHeight);

        // Configura la posición inicial del sprite de fondo
        bgSprite.position.set(0, 0);
        this.app.stage.addChild(bgSprite);

        // Velocidad a la que se moverá el fondo. Ajusta este valor según lo rápido que desees que se mueva
        const velocidadFondo = 1;

        this.app.ticker.add((delta) => {
            // Mueve el fondo una cantidad fija en cada frame. La multiplicación por `delta` asegura un movimiento suave independientemente del framerate
            bgSprite.tilePosition.x -= velocidadFondo * delta;
        });
    }
}

  crearRuleta() {
    // Define el margen superior e inferior deseado.
    const margenSuperior = 50;
    // El margen inferior puede ser mayor si deseas más espacio en la parte inferior, por ejemplo, 100px.
    const margenInferior = this.parent.offsetHeight > 500 ? 100 : 50; // Asumiendo que una altura > 500px no es móvil
    
    // Calcula el espacio vertical disponible teniendo en cuenta ambos márgenes.
    const espacioVerticalDisponible = this.parent.offsetHeight - margenSuperior - margenInferior;
    
    // El radio es el menor valor entre la mitad del ancho del contenedor y la mitad del espacio vertical disponible.
    const radio = Math.min(this.parent.offsetWidth / 2, espacioVerticalDisponible / 2);
    this.radioRuleta = radio;
    
    // El centro en Y se calcula para mantener el margen superior de 50px.
    // Es importante ajustar este cálculo si cambias el margen inferior.
    this.centroRuletaY = margenSuperior + radio - 35;

    this.centroRuletaX = this.parent.offsetWidth / 2;
    
    // Asegúrate de que el centro y el radio calculados se ajustan a tus necesidades.
    const centro = { x: this.centroRuletaX, y: this.centroRuletaY };
    
    // Crea la ruleta con el nuevo centro y radio.
    this.ruleta = new Ruleta(this.app, radio, centro);
    // this.container.addEventListener('pointerup', () => this.ruleta.girarRuleta(30));

    this.ruleta.generarRuleta(this.premios); // Pasamos el array completo de premios
  }


  crearLogo() {
    const textureLogo = PIXI.Assets.get("logo"); // Asegúrate de que "logo" sea la clave correcta en tus assets.
    if (textureLogo) {
        const logoSprite = new PIXI.Sprite(textureLogo);
        
        // Configura el tamaño del logo si es necesario. Ejemplo: logoSprite.width = 100; logoSprite.height = 100;
        logoSprite.width = 60; 
        logoSprite.height = 60;
        // Posiciona el logo en el centro de la ruleta. Asume que el ancla del sprite es (0.5, 0.5) para centrarlo correctamente.
        logoSprite.anchor.set(0.5);
        logoSprite.x = this.centroRuletaX;
        logoSprite.y = this.centroRuletaY;

        
        // Añade el logo al escenario principal, no al contenedor de la ruleta, para que no gire con ella.
        this.app.stage.addChild(logoSprite);
    }
  }

  crearBotonMute() {
    
    // Cargar las texturas para los estados de sonido activado y desactivado
    const textureSonidoOn = PIXI.Assets.get("soundon"); // Asegúrate de que "logo" sea la clave correcta en tus assets.
    const textureSonidoOff = PIXI.Assets.get("soundoff");
    console.log(textureSonidoOn);
    // Crear el sprite del botón, inicialmente con la textura de sonido activado
    const botonMute = new PIXI.Sprite(textureSonidoOn);
    botonMute.x =  this.parent.offsetWidth-botonMute.width; // 20px desde el borde derecho
    botonMute.y = this.parent.offsetHeight-botonMute.height; // 20px desde el borde inferior
    botonMute.width= 40;
    botonMute.height = 40;

    botonMute.interactive = true;

    // Posiciona el logo en el centro de la ruleta. Asume que el ancla del sprite es (0.5, 0.5) para centrarlo correctamente.
    botonMute.anchor.set(0.5);


    // Agregar funcionalidad para alternar el sonido
    let sonidoActivo = true;
    botonMute.on('pointerdown', () => {
      console.log("Estado del sonido antes de cambiar: ", sonidoActivo);
      sonidoActivo = !sonidoActivo;
      console.log("Estado del sonido después de cambiar: ", sonidoActivo);
      botonMute.texture = sonidoActivo ? textureSonidoOn : textureSonidoOff;
      
      Howler.mute(!sonidoActivo);
    });
    botonMute.zIndex = 99;

    // Añadir el botón al escenario
    this.app.stage.addChild(botonMute);
  }


  destruirRuleta() {
    if (this.ruleta) {
      this.ruleta.limpiarSegmentos(); // Esto eliminará los gráficos de la ruleta actual
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeApp.bind(this));
    this.app.destroy();
  }
}