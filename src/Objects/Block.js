import * as THREE from "three";
import gsap from "gsap";
export default class Block {
  constructor(size, clickable, pos, name = "") {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size, 50, size),
      new THREE.MeshLambertMaterial({
        color: 0xe8e5e1,
        wireframe: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      })
    );
    this.mesh.name = name;
    this.mesh.position.copy(pos);
    this.original_pos = pos;
    this.clickable = clickable;
  }

  update() {
    if (this.clickable) {
      if (this.mesh.hover) {
        gsap.to(this.mesh.position, {
          y: this.original_pos.y + 1,
          duration: 0.4,
        });
      } else {
        gsap.to(this.mesh.position, {
          y: this.original_pos.y,
          duration: 0.4,
        });
      }
    }
  }
}
