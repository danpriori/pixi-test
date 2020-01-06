import * as PIXI from "pixi.js";
import { easeInOutQuad } from 'js-easing-functions';
import { Scene } from "./sceneManager/Scene.class";
import { ScenesManager } from "./sceneManager/ScenesManager.class";
    // Class
export class CardsScene extends Scene {
    private card: PIXI.Sprite;
    private buttonMenu: PIXI.Sprite;
    private sceneManager: ScenesManager;

    private elapsed: number;
    private startTime: number = 0;

    private duration:number = 2000;
    private startPosition: number = 0;
    private endPosition: number = -200;
    private currentCardIndex: number = 0;
    private cardsAmount:number = 144;
    private currentCard: any;
    private animationStarted: boolean = false;
    private startCardMoving: boolean = false;
    private intervalElapsed: number = 0;
    private intervalStartTime: number = 0;
    private intervalDuration: number = 1000;
    public cardsContainer: PIXI.Container;

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

    }
    public createScene(): void {
        this.createCards();
        this.startMoving();
    }
    public createCards(): void {
        
        this.cardsContainer = new PIXI.Container();
        this.addChild(this.cardsContainer);
        
        for (let i = 0; i < this.cardsAmount; i++) {
            this.card = new PIXI.Sprite(this.sceneManager.loader.resources.card.texture);
            this.card.anchor.x = 0.5;
            this.card.anchor.y = 0.5;
            this.card.scale.x = 0.5;
            this.card.scale.y = 0.5;
            this.card.position.x = this.sceneManager.width * 0.5 + (i * 1.3);
            this.card.position.y = this.sceneManager.height * 0.5 + (i * 1.3) - 200;
            this.card.name = "card";
            // @ts-ignore
            this.card.zIndex = i;
            this.cardsContainer.addChild(this.card);

        }
        this.cardsContainer.calculateBounds();
        this.cardsContainer.position.x = + 50;
        this.cardsContainer.position.y = + 100;
    }
    public rescale(ratio: number): void {
        this.cardsContainer.scale.x = ratio;
        this.cardsContainer.scale.y = ratio;
        this.buttonMenu.position.x = this.sceneManager.width - 200;
    }
    public startMoving(): void {
        this.resetStartTime();
        this.startCounter();
        this.animationStarted = true;
    }
    public setScene(sceneName: string): void {
        if (this.isPaused()) { return; }
        this.sceneManager.goToScene(sceneName);
    }
    public update(td: number): void {
        super.update(td);
        if (!this.startCardMoving) {
            this.intervalElapsed = Date.now() - this.intervalStartTime;
        }
        if (this.intervalElapsed >= this.intervalDuration) {
            this.startCardMoving = true;
            if (this.animationStarted && this.startCardMoving) {
                if(this.startTime === 0) {
                    this.currentCard = this.cardsContainer.children[this.currentCardIndex];
                    this.startPosition = this.currentCard.position.x;
                    this.startTime = Date.now();
                }
                this.elapsed = Date.now() - this.startTime;
                
                if(this.elapsed < this.duration && this.currentCard.name === "card") {
                    this.currentCard.position.x = easeInOutQuad(this.elapsed, this.startPosition, this.endPosition, this.duration);
                } else {
                    
                    if (this.cardsContainer.children[this.currentCardIndex + 1] && this.cardsContainer.children[this.currentCardIndex + 1].name === "card") {
                        this.currentCard.position.x = this.startPosition + this.endPosition;
                        this.currentCard.zIndex = this.cardsAmount - this.currentCardIndex + 1;
                        // @ts-ignore
                        this.cardsContainer.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex);
                        this.resetStartTime();
                        this.currentCard = this.cardsContainer.children[this.currentCardIndex];
                        this.startPosition = this.currentCard.position.x;

                        this.startCardMoving = false;
                        this.intervalStartTime = Date.now();
                    }
                }
                if (this.currentCard.zIndex >= this.cardsAmount) {
                    this.animationStarted = false;
                }
            }
        }

    }
    public resetStartTime(): void {
        this.startTime = 0;
    }

    public startCounter(): void {
        this.currentCardIndex = 0;
        
    }
}
