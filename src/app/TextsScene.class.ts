import * as PIXI from "pixi.js";
import { Scene } from "./sceneManager/Scene.class";
import { ScenesManager } from "./sceneManager/ScenesManager.class";
    // Class
export class TextsScene extends Scene {
    private buttonMenu: PIXI.Sprite;
    private sceneManager: ScenesManager;
    public container: PIXI.Container;
    public slot1: PIXI.Container;
    public slot2: PIXI.Container;
    public slot3: PIXI.Container;
    public iconsPool: Array<PIXI.Sprite>;
    public textPool: Array<string>;
    public slots: Array<PIXI.Container>;
    private intervalElapsed: number = 0;
    private intervalStartTime: number = 0;
    private intervalDuration: number = 2000;

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

        this.container = new PIXI.Container();
        this.addChild(this.container);
        this.container.position.x = this.sceneManager.width * 0.15;
        this.container.position.y = this.sceneManager.height * 0.2;

        this.slots = new Array<PIXI.Container>(3);
        this.slots[0] = new PIXI.Container();
        this.container.addChild(this.slots[0]);
        this.slots[1] = new PIXI.Container();
        this.container.addChild(this.slots[1]);
        this.slots[2] = new PIXI.Container();
        this.container.addChild(this.slots[2]);

        this.slots[0].position.x = this.container.position.x;
        this.slots[0].position.y = this.container.position.y - 50;

        this.slots[1].position.x = this.container.position.x;
        this.slots[1].position.y = this.container.position.y;

        this.slots[2].position.x = this.container.position.x;
        this.slots[2].position.y = this.container.position.y + 50;

        this.interactive = true;

        this.textPool = new Array<string>(5);
        this.textPool[0] = 'Softgames - Amaze your fun time';
        this.textPool[1] = 'Switching in 3...2...1...';
        this.textPool[2] = 'Loading, or not?';
        this.textPool[3] = 'Formatting your computer in 2 seconds';
        this.textPool[4] = 'Softgames - let\'s play!';

    }
    public rescale(): void {
        this.buttonMenu.position.x = this.sceneManager.width - 200;
        this.container.position.x = this.sceneManager.width * 0.15;
        this.container.position.y = this.sceneManager.height * 0.2;
    }
    public createScene(): void {
        
    }
    public setScene(scene: string): void {
        if (this.isPaused()) { return; }
        this.sceneManager.goToScene(scene);
    }
    public getRandomText(): string {
        const index = Math.round(Math.random() * 5);
        
        return this.textPool[index] || this.textPool[0];
    }
    public getRandomColor(): string {
        return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
    }
    public getRandomSize(): number {
        return Math.round(Math.random() * 10) + 20;
    }
    public update(td: number): void {
        super.update(td);
        
        this.intervalElapsed = Date.now() - this.intervalStartTime;
        if (this.intervalElapsed >= this.intervalDuration) {
            this.slots[0].removeChildren();
            this.slots[1].removeChildren();
            this.slots[2].removeChildren();

            for (let i = 0; i < 3; i++) {
                if (Math.random() > 0.5) {
                    const icon = new PIXI.Sprite(this.sceneManager.loader.resources.icon.texture);
                    icon.anchor.x = 0.5;
                    icon.anchor.y = 0.5;
                    icon.position.x = this.slots[i].position.x;
                    icon.position.y = this.slots[i].position.y;
                    icon.rotation += Math.random();
                    this.slots[i].addChild(icon);
                } else {
                    const fontText = this.getRandomText();
                    const fontColor = this.getRandomColor();
                    const fontSize = this.getRandomSize();
                    const text = new PIXI.Text(fontText,{fontFamily : 'Arial', fontSize: fontSize, fill : fontColor, align : 'center'});
                    text.position.x = this.slots[i].position.x - 200;
                    text.position.y = this.slots[i].position.y;
                    this.slots[i].addChild(text);
                }
            }

            this.intervalStartTime = Date.now();
        }


    }
}
