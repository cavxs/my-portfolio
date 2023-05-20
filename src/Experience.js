import * as THREE from "three";
import CameraHandler from "./CameraHandler";
import MainScene from "./MainScene";
import MouseHandler from "./Utils/MouseHandler";

let _instance = this;

export default class Experience {
  constructor() {
    if (_instance) return _instance;
    _instance = this;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.clock = new THREE.Clock();
    this.cameraHandler = new CameraHandler();
    this.scene = new MainScene();
    this.mouseHandler = new MouseHandler();

    this.renderer.setClearColor(0x000311);

    this.renderer.setSize(innerWidth, innerHeight);

    this.dt = 0;

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.cameraHandler.resize();
    });

    this.scene.makeWorld();
    requestAnimationFrame(() => this.tick());
  }

  tick() {
    this.dt = this.clock.getDelta();
    this.cameraHandler.update();
    this.scene.update();
    this.renderer.render(this.scene.instance, this.cameraHandler.instance);
    requestAnimationFrame(() => this.tick());
  }
}
