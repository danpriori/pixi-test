import * as PIXI from "pixi.js";

export class Scene extends PIXI.Container {
    public name: string = "scene";
    private paused: boolean = false;
    // @ts-ignore
    private timedelta: number;
    constructor() {
        super();
    }
    public update(td: number): void {
        this.timedelta = td;
    }
    public pause(): void {
        this.paused = true;
    }
    public resume(): void {
        this.paused = false;
    }
    public isPaused(): boolean {
        return this.paused;
    }
    // @ts-ignore
    public rescale(ratio: number): void { }
    public createScene(): void { }
}
