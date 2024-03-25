import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameConfig } from './config';
import { Ruleta } from './ruleta';

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

  premios:any =[
    {
      id:1,
      nombre:'Mojito',
      salida: [1,2,3],
      color:null,
      img: 'mojito'
    },
    {
      id:2,
      nombre:'Mojito',
      orden: [4,5,6],
      color:null,
      img: 'chupito'
    },
    {
      id:3,
      nombre:'Mojito',
      orden: [7,8,9],
      color:null,
      img: 'cerveza'
    },
    {
      id:4,
      nombre:'Mojito',
      orden: [7,8,9],
      color:null,
      img: 'copa'
    },
    {
      id:5,
      nombre:'Mojito',
      orden: [7,8,9],
      color:null,
      img: 'refresco'
    },
    // {
    //   id:6,
    //   nombre:'Mojito',
    //   orden: [7,8,9],
    //   color:null,
    //   img: 'mysterybox'
    // },
    {
      id:6,
      nombre:'Mojito',
      orden: [7,8,9],
      color:null,
      img: 'tucancion'
    },
    {
      id:6,
      nombre:'Mojito',
      orden: [7,8,9],
      color:null,
      img: 'nada'
    }
  ]


  ngAfterViewInit(): void {
    this.initializePixiApp();
    this.loadResources();
  }


  async loadResources() {
    // Definir todos los assets necesarios, incluidas las imágenes de los segmentos
    const assets: PIXI.ResolverAssetsObject = {
      'bg': 'assets/sprites/bg.png',
      'flecha': 'assets/sprites/flecha.png',
      'mojito': 'assets/sprites/mojito.jpg',
      'chupito': 'assets/sprites/chupito.jpg',
      'cerveza': 'assets/sprites/cerveza.jpg',
      'copa': 'assets/sprites/copa.jpg',
      'refresco': 'assets/sprites/refresco.jpg',
      'tucancion': 'assets/sprites/tucancion.jpg',
      'mysterybox': 'assets/sprites/mysterybox.jpg',
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
    const centroY = margenSuperior + radio - 35;
    
    // Asegúrate de que el centro y el radio calculados se ajustan a tus necesidades.
    const centro = { x: this.parent.offsetWidth / 2, y: centroY };
    
    // Crea la ruleta con el nuevo centro y radio.
    this.ruleta = new Ruleta(this.app, radio, centro);
    this.container.addEventListener('pointerup', () => this.ruleta.girarRuleta(1000));

    this.ruleta.generarRuleta(this.premios); // Pasamos el array completo de premios
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