// Ubicación: data/games/system/Tools.ts
import * as PIXI from 'pixi.js';

export class Tools {
    private loader: PIXI.Loader;

    constructor() {
        this.loader = new PIXI.Loader();
    }

    cargaMasivaResources(assets: string[]): void {
        assets.forEach(asset => {
            this.loader.add(asset, `src/assets/sprites/${asset}.png`);
        });

        this.loader.load((loader, resources) => {
            console.log('Recursos cargados:', resources);
        });
    }

    res(key: string): PIXI.LoaderResource | undefined {
        return this.loader.resources[key];
    }

    sprite(key: string): PIXI.Sprite | undefined {
        const resource = this.res(key);
        if (resource) {
            return new PIXI.Sprite(resource.texture);
        }
    }
}