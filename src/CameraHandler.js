import * as THREE from "three";
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

    this.instance.position.set(35, 36, 42);
    this.instance.applyQuaternion(
      new THREE.Quaternion(
        -0.14378529848747876,
        0.31863893231145807,
        0.048967817958257866,
        0.9356266197360396
      )
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
    if (this.controls) this.controls.update();
  }
}
