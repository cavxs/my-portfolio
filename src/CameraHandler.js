import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";

export default class CameraHandler {
  constructor() {
    this.experience = new Experience();
    this.instance = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      1,
      1000
    );

    this.instance.position.set(33.662, 35.36, 42.43);
    this.instance.applyQuaternion(
      new THREE.Quaternion(-0.173, 0.295, 0.054, 0.938)
    );
    this.target;
    this.dt = this.experience.dt;

    // this.enableOrbitControls();
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();
  }

  enableOrbitControls() {
    this.controls = new OrbitControls(
      this.instance,
      this.experience.renderer.domElement
    );
    // this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
  update() {
    // console.log(this.instance.position);
    if (this.controls) {
      this.controls.update();
    } else {
      if (this.experience.scene.initial_click) {
        gsap.to(this.instance.position, {
          x: 36.831,
          y: 33.772,
          z: 51.067,
          duration: 0.5,
        });
        gsap.to(this.instance.quaternion, {
          x: -0.1203,
          y: 0.538,
          z: 0.078,
          w: 0.831,
          duration: 0.5,
        });
      }
    }
  }
}
