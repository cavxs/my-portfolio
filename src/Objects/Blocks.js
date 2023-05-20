import * as THREE from "three";
import Block from "./Block";
import Experience from "../Experience";
export default class Blocks {
  constructor() {
    this.mesh = new THREE.Mesh();
    const one_unit = 8;
    const max_height = 5;
    const size = 10;

    this.block11 = new Block(
      size,
      true,
      new THREE.Vector3(0, max_height, 0),
      "Portfolio"
    );
    this.block12 = new Block(
      size,
      false,
      new THREE.Vector3(size, max_height - one_unit, 0)
    );
    this.block13 = new Block(
      size,
      true,
      new THREE.Vector3(size * 2, max_height - one_unit * 2, 0),
      "About me"
    );
    this.block21 = new Block(
      size,
      false,
      new THREE.Vector3(0, max_height - one_unit, size)
    );
    this.block22 = new Block(
      size,
      true,
      new THREE.Vector3(size, max_height - one_unit * 1.5, size)
    );
    this.block23 = new Block(
      size,
      false,
      new THREE.Vector3(size * 2, max_height - one_unit * 2.2, size)
    );
    this.block31 = new Block(
      size,
      true,
      new THREE.Vector3(0, max_height - one_unit * 2, size * 2),
      "Services"
    );
    this.block32 = new Block(
      size,
      false,
      new THREE.Vector3(size, max_height - one_unit * 2.2, size * 2)
    );
    this.block33 = new Block(
      size,
      true,
      new THREE.Vector3(size * 2, max_height - one_unit * 2.5, size * 2),
      "Skills"
    );

    this.block12.mesh.position.x -= 0.1;
    this.block13.mesh.position.x -= 0.2;
    this.block23.mesh.position.x -= 0.1;
    this.hover_objects = [
      this.block11.mesh,
      this.block13.mesh,
      this.block22.mesh,
      this.block31.mesh,
      this.block33.mesh,
    ];
    this.hover_object_init();

    this.mesh.add(this.block11.mesh);
    this.mesh.add(this.block12.mesh);
    this.mesh.add(this.block13.mesh);
    this.mesh.add(this.block21.mesh);
    this.mesh.add(this.block22.mesh);
    this.mesh.add(this.block23.mesh);
    this.mesh.add(this.block31.mesh);
    this.mesh.add(this.block32.mesh);
    this.mesh.add(this.block33.mesh);
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
