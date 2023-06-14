import * as THREE from "three";
import CameraHandler from "./CameraHandler";
import MainScene from "./MainScene";
import MouseHandler from "./Utils/MouseHandler";
import GuiHandler from "./Utils/GuiHandler";
import ResourceLoader from "./Utils/ResourceLoader";

let _instance = this;

export default class Experience {
  constructor() {
    if (_instance) return _instance;
    _instance = this;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: "lowp",
    });

    this.clock = new THREE.Clock();
    this.cameraHandler = new CameraHandler();
    this.scene = new MainScene();
    this.mouseHandler = new MouseHandler();
    this.gui = new GuiHandler();
    this.renderer.setClearColor(0x2c2c38);
    this.resourceLoader = new ResourceLoader();
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.useLegacyLights = false;
    this.dt = 0;

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.cameraHandler.resize();
    });

    // Load the resources (the world) then make the scene using the data
    this.resourceLoader.load((loaded) => this.scene.makeWorld(loaded));
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
