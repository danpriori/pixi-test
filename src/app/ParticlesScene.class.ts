import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import { Scene } from "./sceneManager/Scene.class";
import { ScenesManager } from "./sceneManager/ScenesManager.class";
    // Class
export class ParticlesScene extends Scene {
    private buttonMenu: PIXI.Sprite;
    private sceneManager: ScenesManager;
    private elapsed: number;
    private now: number;
    private emitter: any
    public container: PIXI.Container;

    constructor(sceneManager: ScenesManager) {
        super();
        this.sceneManager = sceneManager;

        this.buttonMenu = new PIXI.Sprite(this.sceneManager.loader.resources.buttonMenu.texture);
        this.buttonMenu.position.x = this.sceneManager.width - 200;
        this.buttonMenu.scale.x = 0.5;
        this.buttonMenu.scale.y = 0.5;
        this.buttonMenu.on("tap", () => {
            this.setScene("MenuScene");
        });
        this.buttonMenu.on("click", () => {
            this.setScene("MenuScene");
        });

        this.buttonMenu.interactive = true;
        this.buttonMenu.buttonMode  = true;
        this.addChild(this.buttonMenu);
        
        this.interactive = true;

        this.startParticles();
    }
    public createScene(): void {
        
    }
    public setScene(scene: string): void {
        if (this.isPaused()) { return; }
        this.sceneManager.goToScene(scene);
    }
    public rescale(): void {
        this.buttonMenu.position.x = this.sceneManager.width - 200;
        this.emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);
    }
    public update(td: number): void {
        super.update(td);

        this.now = Date.now();
        this.emitter.update((this.now - this.elapsed) * 0.0004);
        this.elapsed = this.now;
    }

    private startParticles(): void {
        this.container = new PIXI.Container();
        this.addChild(this.container);
        const filter = new PIXI.filters.BlurFilter(2.5);
        filter.blendMode = PIXI.BLEND_MODES.ADD;
        this.container.filters = [filter];

        this.emitter = new particles.Emitter(

            this.container,

            ["assets/img/particle.png", "assets/img/fire1.png", "assets/img/fire2.png", "assets/img/fire3.png"/* , "assets/img/flame3.png", "assets/img/flame4.png" */],
            {
                alpha: {
                    start: 0.62,
                    end: 0,
                    list: [
                        {
                            value: 0.0,
                            time: 0
                        },
                        {
                            value: 0.62,
                            time: 0.05
                        },
                        {
                            value: 0.0,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    start: 0.25,
                    end: 0.55
                },
                color: {
                    start: "fff191",
                    end: "ff1212"
                },
                speed: {
                    start: 400,
                    end: 300
                },
                startRotation: {
                    min: 265,
                    max: 275
                },
                rotationSpeed: {
                    min: 50,
                    max: 50
                },
                lifetime: {
                    min: 0.1,
                    max: 0.25
                },
                blendMode: "add",
                frequency: 0.00001,
                particlesPerWave: 1,
                emitterLifetime: 0,
                maxParticles: 10,
                pos: {
                    x: 0,
                    y: 0
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 5,
                    y: 5,
                    r: 10
                }
            }
        
        );

        this.elapsed = Date.now();
        this.emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);

        this.emitter.emit = true;
    }
}