import * as THREE from "three";
import Experience from "./Experience";
import Block from "./Objects/Block";
import Blocks from "./Objects/Blocks";
export default class MainScene {
  constructor() {
    this.instance = new THREE.Scene();

    this.experience = new Experience();
    this.sceneObjects = [];
    this.hover_objects = [];
    this.initial_click = false;
    this.current_section = null;
  }

  makeWorld() {
    // original colors
    // const light1 = new THREE.DirectionalLight(0xe100ff);
    // const light2 = new THREE.DirectionalLight(0xff9300);

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    // ]);
    // this.instance.background = texture;

    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = Math.random() * 2000 - 1000;
      positions[i + 1] = Math.random() * 2000 - 1000;
      positions[i + 2] = Math.random() * 2000 - 1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff });
    const particleSystem = new THREE.Points(geometry, material);
    this.instance.add(particleSystem);

    const light1 = new THREE.DirectionalLight(0x9086a7); // purple
    const light2 = new THREE.DirectionalLight(0xffdeb0);
    const light3 = new THREE.HemisphereLight(0xd9cebf);
    const light4 = new THREE.DirectionalLight(0xffffff);

    light2.position.set(0, 19, 60);
    light2.intensity = 1;

    light1.position.set(60, 19, 3);
    light1.intensity = 1;
    light3.intensity = 0.5;

    light4.position.set(0, 50, 0);
    light4.intensity = 0.3;
    // const light1helper = new THREE.DirectionalLightHelper(light1, 5);
    // const light2helper = new THREE.DirectionalLightHelper(light2, 5);
    this.instance.add(light1);
    this.instance.add(light2);
    this.instance.add(light3);
    this.instance.add(light4);
    // this.instance.add(light1helper);
    // this.instance.add(light2helper);
    this.blocks = new Blocks();

    this.addToScene(this.blocks);
  }
  removeFromScene(obj) {
    const mesh = obj.mesh;
    const uuid = obj.mesh.uuid;
    this.sceneObjects = this.sceneObjects.filter(
      (item) => !(item.mesh.uuid === uuid)
    );
    this.instance.remove(mesh);
  }

  setInitialClick(val) {
    this.initial_click = val;
    document.getElementById("gui").classList.toggle("hidden", !val);
  }
  addToScene(obj, pos) {
    this.instance.add(obj.mesh);
    this.sceneObjects.push(obj);
    if (pos) obj.mesh.position.copy(pos);
  }

  update() {
    for (const obj of this.sceneObjects) {
      if (obj?.update) obj.update();
    }
  }
}
