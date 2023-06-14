import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience";
export default class Block {
  constructor(mesh, clickable, name = "", section = "") {
    this.experience = new Experience();
    this.mesh = mesh;
    if (!window.blockmeshes) window.blockmeshes = {};

    window.blockmeshes[name] = this.mesh;
    this.section = section;
    this.mesh.name = name;
    this._up_pos = this.mesh.position.y + 4;
    this._down_pos = this.mesh.position.y - 20;
    this.original_pos = new THREE.Vector3().copy(this.mesh.position);
    this.mesh.clickable = clickable;
    this.mesh.onclick = this.onclick;

    this.startBtnInterval = null;
  }

  onclick = () => {
    // this.experience.scene.startInitialClick();
    // this.experience.scene.current_section = this.mesh.name;
    // this.experience.gui.selectSection(this.section);
    if (this.section === "start") {
      this.experience.scene.startInitialClick();
      this.experience.scene.current_section = "Portfolio";
      this.experience.gui.selectSection("portfolio");
    }

    this._clearInterval(this.startBtnInterval);
  };
  update = () => {
    const cur_section = this.experience.scene.current_section;
    let cur_pos = this.original_pos;

    // if the start button is clicked
    if (cur_section) {
      // if (this.section !== "start") {
      this.detectPositionAndAnimate(cur_section);
      // }
    } else {
      if (this.section == "start") {
        // this.detectPositionAndAnimate(cur_section);

        // animate up and down
        if (!this.mesh.hover) {
          if (!this.startBtnInterval) {
            this._startInterval();
          }
        } else {
          this._clearInterval();
          this.detectPositionAndAnimate(cur_section);
        }
      }
    }

    // }
  };
  _startInterval = () => {
    this.startBtnInterval = setInterval(() => {
      gsap
        .to(this.mesh.position, {
          y: this.original_pos.y + 3,
          duration: 0.4,
        })
        .then(() => {
          gsap
            .to(this.mesh.position, {
              y: this.original_pos.y + 1,
              duration: 0.4,
            })
            .then(() => {
              gsap
                .to(this.mesh.position, {
                  y: this.original_pos.y + 3,
                  duration: 0.4,
                })
                .then(() => {
                  gsap.to(this.mesh.position, {
                    y: this.original_pos.y,
                    duration: 0.5,
                  });
                });
            });
        });
    }, 3000);
  };
  _clearInterval = () => {
    clearInterval(this.startBtnInterval);
    this.startBtnInterval = null;
  };
  detectPositionAndAnimate = (cur_section) => {
    if (this.mesh.clickable) {
      if (cur_section) {
        if (cur_section === this.mesh.name) {
          this.mesh.children[0].rotation.y += 0.01;
          gsap.to(this.mesh.position, {
            y: this.original_pos.y - this._up_pos,
            duration: 0.4,
          });
        }
      }
      // if (this.experience.cur_section && this.section !== "start") {
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
