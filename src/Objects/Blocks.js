import * as THREE from "three";
import Block from "./Block";
import Experience from "../Experience";
export default class Blocks {
  constructor(scene) {
    this.mesh = new THREE.Mesh();

    this.block11 = new Block(
      scene.find((x) => x.name === "Cube"),
      true,
      "about-me",
      "about-me"
    );
    this.block12 = new Block(
      scene.find((x) => x.name === "Cube001"),
      false
    );
    this.block13 = new Block(
      scene.find((x) => x.name === "Cube002"),
      true,
      "ach",
      "ach"
    );
    this.block21 = new Block(
      scene.find((x) => x.name === "Cube003"),
      false
    );
    this.block22 = new Block(
      scene.find((x) => x.name === "Cube004"),
      true,
      "Start",
      "start"
    );
    this.block23 = new Block(
      scene.find((x) => x.name === "Cube005"),
      false
    );
    this.block31 = new Block(
      scene.find((x) => x.name === "Cube006"),
      true,
      "hire",
      "hire"
    );
    this.block32 = new Block(
      scene.find((x) => x.name === "Cube007"),
      false
    );
    this.block33 = new Block(
      scene.find((x) => x.name === "Cube008"),
      true,
      "home",
      "home"
    );

    this.hover_objects = [
      this.block11.mesh,
      this.block13.mesh,
      this.block22.mesh,
      this.block31.mesh,
      this.block33.mesh,
    ];
    this.hover_object_init();
  }

  hover_object_init() {
    for (const obj of this.hover_objects) {
      obj.hover_effect = true;
    }
  }

  update() {
    this.block11.update();
    this.block12.update();
    this.block13.update();
    this.block21.update();
    this.block22.update();
    this.block23.update();
    this.block31.update();
    this.block32.update();
    this.block33.update();
  }
}
