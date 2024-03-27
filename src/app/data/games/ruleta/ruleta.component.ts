import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameConfig } from './config';
import { Ruleta } from './ruleta';
import { EfectoLluvia } from './efectolluvia';

import { AnimatedSprite, Application, Assets, ResolverAssetsObject, Texture } from 'pixi.js';

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
  container:any;
  loading = 0;
  gameAssets: any;
  ruleta:any;
  centroRuletaX:any;
  centroRuletaY:any;

  premios:any =[
    {
      id:1,
      nombre:'Mojito',
      salida: [1,2,3],
      color:null,
      img: 'mojito',
      ico: 'mojitoico'

    },
    {
      id:2,
      nombre:'Chupito',
      orden: [4,5,6],
      color:null,
      img: 'chupito',
      ico: 'chupitoico'
    },
    {
      id:3,
      nombre:'Cerveza',
      orden: [7,8,9],
      color:null,
      img: 'cerveza',
      ico: 'cervezaico'
    },
    {
      id:4,
      nombre:'Copa',
      orden: [7,8,9],
      color:null,
      img: 'copa',
      ico: 'copaico'
    },
    {
      id:5,
      nombre:'Refresco',
      orden: [7,8,9],
      color:null,
      img: 'refresco',
      ico: 'refrescoico'
    },
    {
      id:6,
      nombre:'Mystery Box',
      orden: [7,8,9],
      color:null,
      img: 'mysterybox',
      ico: 'mysteryboxico'
    },
    {
      id:7,
      nombre:'Tu canción',
      orden: [7,8,9],
      color:null,
      img: 'tucancion',
      ico: 'tucancionico'
    },
    {
      id:8,
      nombre:'Nada',
      orden: [7,8,9],
      color:null,
      img: 'nada',
      ico: ''
    }
  ]

  efectoLluvia:any;


  ngAfterViewInit(): void {
    this.initializePixiApp();
    this.loadResources();
  }


  async loadResources() {
    // Definir todos los assets necesarios, incluidas las imágenes de los segmentos
    const assets: PIXI.ResolverAssetsObject = {
      'bg': 'assets/sprites/bg.png',
      'madera': 'assets/sprites/madera.jpg',
      'logo':'assets/sprites/logo.png',
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
      'nada': 'assets/sprites/nada.jpg'
    };
  
    // Añadir todos los assets al bundle
    Assets.addBundle('miJuego', assets);
  
    // Cargar el bundle
    this.gameAssets = await Assets.loadBundle('miJuego', (loadingPercentage) => {
      this.loading = Math.floor(loadingPercentage * 100);
    });
  
    this.createBackground();
    this.crearRuleta();
    this.crearLogo();
    this.crearEfectoLluvia();
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

  createBackground() {
    const texture = PIXI.Assets.get('bg'); // Usando el nombre del asset directamente
    if (texture) {
        const bgSprite = new PIXI.Sprite(texture);
        this.app.stage.addChild(bgSprite);
        bgSprite.width = this.container.offsetWidth;
        bgSprite.height = this.container.offsetHeight;
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
    
    // El centro en Y se calcula para mantener el margen superior de 50px.
    // Es importante ajustar este cálculo si cambias el margen inferior.
    this.centroRuletaY = margenSuperior + radio - 35;

    this.centroRuletaX = this.parent.offsetWidth / 2;
    
    // Asegúrate de que el centro y el radio calculados se ajustan a tus necesidades.
    const centro = { x: this.centroRuletaX, y: this.centroRuletaY };
    
    // Crea la ruleta con el nuevo centro y radio.
    this.ruleta = new Ruleta(this.app, radio, centro);
    this.container.addEventListener('pointerup', () => this.ruleta.girarRuleta(30));

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

  crearEfectoLluvia(){
    // En tu componente, después de cargar los recursos y crear la aplicación PIXI:
      this.efectoLluvia = new EfectoLluvia(this.app, this.premios);
      this.efectoLluvia.iniciarLluvia();
  }
  

  destruirRuleta() {
    if (this.ruleta) {
      this.ruleta.limpiarSegmentos(); // Esto eliminará los gráficos de la ruleta actual
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeApp.bind(this));
    this.efectoLluvia.detenerLluvia();
    this.app.destroy();
  }
}