import * as PIXI from "pixi.js";
import { ScenesManager } from "@app/sceneManager/ScenesManager.class";
import { MenuScene } from "@app/MenuScene.class";
import { CardsScene } from "@app/CardsScene.class";
import { TextsScene } from "@app/TextsScene.class";
import { ParticlesScene } from "@app/ParticlesScene.class";

class Game {
  public sceneManager: ScenesManager;
  private app: PIXI.Application;
  public load(): void {
    // preload assets
    PIXI.loader.add("buttonCards", "/assets/img/buttonCards.png");
    PIXI.loader.add("buttonTexts", "/assets/img/buttonTexts.png");
    PIXI.loader.add("buttonParticles", "/assets/img/buttonParticles.png");
    PIXI.loader.add("buttonMenu", "/assets/img/buttonMenu.png");

    PIXI.loader.add("card", "/assets/img/card.png");
    PIXI.loader.add("icon", "/assets/img/icon.png");

    // launch app after loaded assets
    PIXI.loader.load(this.startApp.bind(this));
  }

  public startApp(): void {

    this.app = new PIXI.Application({
      autoResize: true,
      backgroundColor: 0x000000,
      height: window.innerHeight,
      resolution: devicePixelRatio,
      width: window.innerWidth
    });

    document.body.appendChild(this.app.view);
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    this.app.view.style.display = 'block';

    this.sceneManager = new ScenesManager(this.app, PIXI.loader);

    this.sceneManager.createScene("MenuScene", MenuScene);
    this.sceneManager.createScene("CardsScene", CardsScene);
    this.sceneManager.createScene("TextsScene", TextsScene);
    this.sceneManager.createScene("ParticlesScene", ParticlesScene);

    this.sceneManager.goToScene("MenuScene");
  }
}

const game = new Game();
game.load();
