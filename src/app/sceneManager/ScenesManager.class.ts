import * as PIXI from "pixi.js";
import * as Stats from "stats.js";
import { Scene } from "./Scene.class";

export class ScenesManager {
    public currentScene: Scene;
    public renderer: PIXI.SystemRenderer;
    public ratio: number = 1;
    public width: number;
    public height: number;
    public loader: any;
    public defaultWidth: number;
    public defaultHeight: number;
    public scenes: any = {};

    public app: PIXI.Application;

    constructor(app: PIXI.Application, loader: any) {
        this.app = app;
        this.defaultWidth = this.width = this.app.view.clientWidth;
        this.defaultHeight = this.height = this.app.view.clientHeight;
        this.loader = loader;

        this.rescale();
        
        window.addEventListener("resize", () => { this.rescale(); }, false);
        
        const stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild( stats.dom );

        this.app.ticker.add((td) => {
            stats.begin();
            this.loop(td);
            stats.end();
        });

    }
    public createScene(id: string, GameScene: new (sceneManager: ScenesManager) => Scene = Scene): Scene {
        if (this.scenes[id]) { return undefined; }
        
        const scene = new GameScene(this);
        scene.createScene();
        
        this.scenes[id] = scene;
        
        return scene;
    }
    
    public goToScene(id: string): boolean {
        
        if (this.scenes[id]) {
            if (this.currentScene) { this.currentScene.pause(); }
            this.currentScene = this.scenes[id];
            this.app.stage.removeChildren();
            this.app.stage.addChild(this.currentScene);
            this.currentScene.resume();
            this.rescale();
            return true;
        }
        return false;
    }
    
    public rescale(): void {
        
        this.ratio = Math.min(window.innerWidth / this.app.view.width, window.innerHeight / this.app.view.height);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        
        if (this.currentScene) {
            this.currentScene.rescale(this.ratio);
        }
    }
    
    private loop(td: number): void {        
        if (!this.currentScene || this.currentScene.isPaused()) { return; }
        this.currentScene.update(td);
    }


}