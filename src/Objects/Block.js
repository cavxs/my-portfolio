import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience";
export default class Block {
  constructor(size, clickable, pos, name = "") {
    this.experience = new Experience();
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
    this._up_pos = pos.y + 4;
    this._down_pos = pos.y - 20;
    this.original_pos = pos;
    this.mesh.clickable = clickable;
    this.mesh.onclick = this.onclick;
  }

  onclick = () => {
    this.experience.scene.setInitialClick(true);
    this.experience.scene.current_section = this.mesh.name;
  };
  update = () => {
    const cur_section = this.experience.scene.current_section;
    let cur_pos = this.original_pos;

    // if (cur_section) {
    //   if (cur_section === this.mesh.name) {
    //     gsap.to(this.mesh.position, {
    //       y: this.original_pos.y - this._up_pos,
    //       duration: 0.4,
    //     });
    //   }
    // }
    if (this.mesh.clickable) {
      if (this.mesh.hover) {
        gsap.to(this.mesh.position, {
          y: cur_section
            ? cur_section === this.mesh.name
              ? this._up_pos + 1
              : this._down_pos + 1
            : this.original_pos.y + 1,
          duration: 0.4,
        });
      } else {
        gsap.to(this.mesh.position, {
          y: cur_section
            ? cur_section === this.mesh.name
              ? this._up_pos
              : this._down_pos
            : this.original_pos.y,
          duration: 0.4,
        });
      }
    } else {
      gsap.to(this.mesh.position, {
        y: cur_section
          ? cur_section === this.mesh.name
            ? this._up_pos
            : this._down_pos
          : this.original_pos.y,
        duration: 0.4,
      });
    }
  };
}
