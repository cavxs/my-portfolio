import * as THREE from "three";
import Experience from "./Experience";
import Block from "./Objects/Block";
export default class MainScene {
  constructor() {
    this.instance = new THREE.Scene();

    this.experience = new Experience();
    this.sceneObjects = [];
    this.hover_objects = [];

    this.current_section = null;
  }

  makeWorld() {
    // original colors
    // const light1 = new THREE.DirectionalLight(0xe100ff);
    // const light2 = new THREE.DirectionalLight(0xff9300);
    const light1 = new THREE.DirectionalLight(0x9086a7);
    const light2 = new THREE.DirectionalLight(0xffdeb0);
    const light3 = new THREE.HemisphereLight(0xd9cebf);

    light2.position.set(0, 19, 60);
    light2.intensity = 1;

    light1.position.set(60, 19, 3);
    light1.intensity = 1;
    light3.intensity = 0.5;
    // const light1helper = new THREE.DirectionalLightHelper(light1, 5);
    // const light2helper = new THREE.DirectionalLightHelper(light2, 5);
    this.instance.add(light1);
    this.instance.add(light2);
    this.instance.add(light3);
    // this.instance.add(light1helper);
    // this.instance.add(light2helper);

    const one_unit = 8;
    const max_height = 5;
    const size = 10;
    const block11 = new Block(
      size,
      true,
      new THREE.Vector3(0, max_height, 0),
      "Portfolio"
    );
    const block12 = new Block(
      size,
      false,
      new THREE.Vector3(size, max_height - one_unit, 0)
    );
    const block13 = new Block(
      size,
      true,
      new THREE.Vector3(size * 2, max_height - one_unit * 2, 0),
      "About me"
    );
    const block21 = new Block(
      size,
      false,
      new THREE.Vector3(0, max_height - one_unit, size)
    );
    const block22 = new Block(
      size,
      true,
      new THREE.Vector3(size, max_height - one_unit * 1.4, size)
    );
    const block23 = new Block(
      size,
      false,
      new THREE.Vector3(size * 2, max_height - one_unit * 2.2, size)
    );
    const block31 = new Block(
      size,
      true,
      new THREE.Vector3(0, max_height - one_unit * 2, size * 2),
      "Services"
    );
    const block32 = new Block(
      size,
      false,
      new THREE.Vector3(size, max_height - one_unit * 2.2, size * 2)
    );
    const block33 = new Block(
      size,
      true,
      new THREE.Vector3(size * 2, max_height - one_unit * 2.4, size * 2),
      "Skills"
    );
    this.hover_objects = [
      block11.mesh,
      block13.mesh,
      block22.mesh,
      block31.mesh,
      block33.mesh,
    ];
    this.hover_object_init();

    this.addToScene(block11);
    this.addToScene(block12);
    this.addToScene(block13);
    this.addToScene(block21);
    this.addToScene(block22);
    this.addToScene(block23);
    this.addToScene(block31);
    this.addToScene(block32);
    this.addToScene(block33);
  }
  removeFromScene(obj) {
    const mesh = obj.mesh;
    const uuid = obj.mesh.uuid;
    this.sceneObjects = this.sceneObjects.filter(
      (item) => !(item.mesh.uuid === uuid)
    );
    this.instance.remove(mesh);
  }
  addToScene(obj, pos) {
    this.instance.add(obj.mesh);
    this.sceneObjects.push(obj);
    if (pos) obj.mesh.position.copy(pos);
  }

  hover_object_init() {
    for (const obj of this.hover_objects) {
      obj.hover_effect = true;
    }
  }
  update() {
    for (const obj of this.sceneObjects) {
      if (obj?.update) obj.update();
    }
  }
}
