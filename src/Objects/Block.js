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

    const cPos = this.mesh?.children[0]?.position;
    if (cPos) this.child_pos = new THREE.Vector3().copy(cPos);
    this.moving_to = this.mesh.position.y;

    this.startBtnInterval = null;
    this.disableMouseActions = false;
  }

  onclick = () => {
    // this.experience.scene.startInitialClick();
    // this.experience.scene.current_section = this.mesh.name;
    // this.experience.gui.selectSection(this.section);
    if (this.experience.scene.current_section) {
      if (this.section !== "start") {
        // click anim
        gsap.to(this.mesh.position, {
          y: this.original_pos.y - 2,
          duration: 0.1,
          onComplete: () => {
            this.disableMouseActions = false;
          },
        });

        // move to the section
        document
          .getElementById(this.section)
          .scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (this.section === "start") {
        this.experience.scene.startInitialClick();
        gsap.to(this.mesh.children[0].rotation, {
          // y: 7,
          y: 32,
          duration: 2,
          ease: "power2",
        });
        //click
        gsap
          .to(this.mesh.position, {
            y: this.original_pos.y - 2,
            duration: 0.1,
            onComplete: () => {
              this.disableMouseActions = false;
            },
          })
          .then(() => {
            gsap.to(this.mesh.position, {
              y: this.original_pos.y,
              duration: 0.4,
              ease: "power2",
            });
          });
      }
    }
    this.disableMouseActions = true;
    this._clearInterval(this.startBtnInterval);
  };

  // _move_to = (endy) => {

  // }
  update = () => {
    // if the start button is clicked
    // if (cur_section) {
    //   // if (this.section !== "start") {

    //   // }
    // } else {
    //   if (this.section == "start") {
    //     // this.detectPositionAndAnimate(cur_section);

    //     // animate up and down
    //     if (!this.mesh.hover) {
    //       if (!this.startBtnInterval) {
    //         this._startInterval();
    //       }
    //     } else {
    //       this._clearInterval();
    //       this.detectPositionAndAnimate(cur_section);
    //     }
    //   }
    // }

    if (this.mesh.clickable) {
      const cur_section = this.experience.scene.current_section;
      let cur_pos = this.original_pos;
      let where_to_move = this.mesh.position.y;
      // let animation = false;

      //! after pressing start
      if (cur_section) {
        // if this is not the start block
        if (this.section !== "start") {
          // if this is the selected block
          if (cur_section === this.mesh.name) {
            this.mesh.children[0].rotation.y += 0.02;
            where_to_move = this._up_pos;
          } else {
            // if this is not the selected block

            if (this.mesh.hover) {
              where_to_move = this.original_pos.y + 1;
            } else {
              where_to_move = this.original_pos.y;
            }
          }
        } else {
          // if this is the start block
        }
      } else {
        //! if at the start
        // if this is the start block
        if (this.section === "start") {
          // the start block will have an animation
          if (this.mesh.hover) {
            this._clearInterval();
            // this.mesh.children[0].rotation.y += 0.1;

            // gsap.to(this.mesh.children[0].position, {
            //   y: this.child_pos.y + 5,
            //   duration: 0.5,
            // });
            where_to_move = this.original_pos.y + 1;
          } else {
            where_to_move = this.original_pos.y;

            if (!this.startBtnInterval) {
              if (!this.animTimer) {
                this.animTimer = setTimeout(() => {
                  if (
                    !this.mesh.hover &&
                    !this.startBtnInterval &&
                    !cur_section
                  ) {
                    this._startInterval();
                    console.log("started");
                  }
                  this.animTimer = null;
                }, 1000);
              }
            }
          }
        } else {
          // if this is any other block
          // the animation is disabled for other blocks
        }
      }

      // if the moving to is out of bounds with the where to move
      if (
        this.moving_to !== where_to_move &&
        !this.startBtnInterval &&
        !this.disableMouseActions
        // this.moving_to < where_to_move - 0.01 ||
        // this.moving_to > where_to_move + 0.01
      ) {
        // console.log(
        //   "moving because where to move",
        //   where_to_move,
        //   "from",
        //   this.moving_to
        // );
        this.moving_to = where_to_move;
        gsap.to(this.mesh.position, {
          y: where_to_move,
          duration: 0.4,
        });
      }
    }

    // }
  };
  _startInterval = () => {
    this.startBtnInterval = setInterval(() => {
      if (this.startBtnInterval) {
        gsap
          .to(this.mesh.position, {
            y: this.original_pos.y + 3,
            duration: 0.4,
          })
          .then(() => {
            if (this.startBtnInterval) {
              gsap
                .to(this.mesh.position, {
                  y: this.original_pos.y + 1,
                  duration: 0.4,
                })
                .then(() => {
                  if (this.startBtnInterval) {
                    gsap
                      .to(this.mesh.position, {
                        y: this.original_pos.y + 3,
                        duration: 0.4,
                      })
                      .then(() => {
                        if (this.startBtnInterval) {
                          gsap.to(this.mesh.position, {
                            y: this.original_pos.y,
                            duration: 0.5,
                          });
                        }
                      });
                  }
                });
            }
          });
      }
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
