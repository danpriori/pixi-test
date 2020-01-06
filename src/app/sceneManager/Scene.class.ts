import * as PIXI from "pixi.js";

    // Class
export class Scene extends PIXI.Container {
    // public container: PIXI.Container;
    private paused: boolean = false;
    public name: string = "scene";
    // @ts-ignore
    private timedelta: number;
    constructor() {
        super();
        // this.container = new PIXI.Container();
    }
    public onUpdate(updateCB: () => void ): void {
        this.updateCB = updateCB;
    }
    public update(td: number): void {
        this.timedelta = td;
        this.updateCB();
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
    private updateCB = () => { };
}
