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
    this.initialCameraPosition = this.instance.position.clone();

    // this.enableOrbitControls();
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    const maxScrollUp = 36;
    const maxScrollDown = -15;
    var targetPositionY = -15; // Example target position

    window.addEventListener("wheel", (e) => {
      // Determine the scroll direction and calculate the target position
      const scrollDelta = e.deltaY;
      const scrolldown = e.deltaY > 0;
      const currentPosition = this.instance.position.y;
      let targetPosition;

      if (scrollDelta < 0) {
        targetPosition = Math.min(
          maxScrollUp,
          currentPosition - scrollDelta * 0.4
        );
      } else {
        targetPosition = Math.max(
          maxScrollDown,
          currentPosition - scrollDelta * 0.4
        );
      }

      // Move the camera to the target position
      gsap.to(this.instance.position, {
        y: targetPosition,
        duration: 0.5,
        ease: "power2.out",
        // onUpdate: () => {
        //   camera.lookAt(scene.position);
        // },
      });
    });
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

  initialClickSetup() {
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
  update() {
    // console.log(this.instance.position);
    if (this.controls) {
      this.controls.update();
    }
  }
}
