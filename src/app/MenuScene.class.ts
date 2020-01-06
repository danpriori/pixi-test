import * as PIXI from "pixi.js";
import { Scene } from "./sceneManager/Scene.class";
import { ScenesManager } from "./sceneManager/ScenesManager.class";

export class MenuScene extends Scene {

    private buttonCards: PIXI.Sprite;

    private buttonTexts: PIXI.Sprite;

    private buttonParticles: PIXI.Sprite;

    private sceneManager: ScenesManager;

    constructor(sceneManager: ScenesManager) {
        super();

        this.sceneManager = sceneManager;

        this.buttonCards = new PIXI.Sprite(this.sceneManager.loader.resources.buttonCards.texture);

        this.buttonCards.scale.x = 0.7;
        this.buttonCards.scale.y = 0.7;

        this.buttonCards.anchor.x = 0.5;
        this.buttonCards.anchor.y = 0.5;

        this.buttonCards.position.x = this.sceneManager.width * 0.5;
        this.buttonCards.position.y = this.sceneManager.height * 0.5 - 100;

        this.buttonCards.interactive  = true;

        this.buttonCards.buttonMode  = true;

        this.buttonTexts = new PIXI.Sprite(this.sceneManager.loader.resources.buttonTexts.texture);

        this.buttonTexts.scale.x = 0.7;
        this.buttonTexts.scale.y = 0.7;

        this.buttonTexts.anchor.x = 0.5;
        this.buttonTexts.anchor.y = 0.5;

        this.buttonTexts.position.x = this.sceneManager.width * 0.5;
        this.buttonTexts.position.y = this.sceneManager.height * 0.5;
        
        this.buttonTexts.interactive  = true;

        this.buttonTexts.buttonMode  = true;

        this.buttonParticles = new PIXI.Sprite(this.sceneManager.loader.resources.buttonParticles.texture);

        this.buttonParticles.scale.x = 0.7;
        this.buttonParticles.scale.y = 0.7;

        this.buttonParticles.anchor.x = 0.5;
        this.buttonParticles.anchor.y = 0.5;

        this.buttonParticles.position.x = this.sceneManager.width * 0.5;
        this.buttonParticles.position.y = this.sceneManager.height * 0.5 + 100;

        this.buttonParticles.interactive  = true;

        this.buttonParticles.buttonMode  = true;

        this.registerEvents();

        this.addChild(this.buttonCards);
        this.addChild(this.buttonTexts);
        this.addChild(this.buttonParticles);

        this.interactive = true;

    }
    public createScene(): void {
        
    }
    public rescale(): void {
        this.buttonTexts.position.x = this.sceneManager.width * 0.5;
        this.buttonParticles.position.x = this.sceneManager.width * 0.5;
        this.buttonCards.position.x = this.sceneManager.width * 0.5;
    }
    private registerEvents(): void {
        this.buttonCards.on("tap", () => {
            this.setScene("CardsScene");
        });
        this.buttonCards.on("click", () => {
            this.setScene("CardsScene");
        });

        this.buttonTexts.on("tap", () => {
            this.setScene("TextsScene");
        });
        this.buttonTexts.on("click", () => {
            this.setScene("TextsScene");
        });

        this.buttonParticles.on("tap", () => {
            this.setScene("ParticlesScene");
        });
        this.buttonParticles.on("click", () => {
            this.setScene("ParticlesScene");
        });

    }
    private setScene(scene: string): void {
        if (this.isPaused()) { return; }
        this.sceneManager.goToScene(scene);
    }

}
