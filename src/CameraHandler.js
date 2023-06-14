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

    this.instance.position.set(
      86.2109629608584,
      110.66595749767006,
      59.21213026679405
    );
    this.instance.applyQuaternion(
      new THREE.Quaternion(
        -0.1723640927416455,
        0.4463369042612144,
        0.08805544363609472,
        0.8736819937905985
      )
    );
    this.target;
    this.dt = this.experience.dt;
    this.initialCameraPosition = this.instance.position.clone();

    // this.enableOrbitControls();
    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    // const maxScrollUp = 36;
    // const maxScrollDown = -15;
    // var targetPositionY = -15; // Example target position

    // window.addEventListener("wheel", (e) => {
    //   // Determine the scroll direction and calculate the target position
    //   // const scrollDelta = e.deltaY;
    //   // const scrolldown = e.deltaY > 0;
    //   // const currentPosition = this.instance.position.y;
    //   // let targetPosition;
    //   // if (scrollDelta < 0) {
    //   //   targetPosition = Math.min(
    //   //     maxScrollUp,
    //   //     currentPosition - scrollDelta * 0.4
    //   //   );
    //   // } else {
    //   //   targetPosition = Math.max(
    //   //     maxScrollDown,
    //   //     currentPosition - scrollDelta * 0.4
    //   //   );
    //   // }
    //   // this.experience.gui.instance.scrollBy(0, scrollDelta);
    //   // Move the camera to the target position
    //   // gsap.to(this.instance.position, {
    //   //   y: targetPosition,
    //   //   duration: 0.5,
    //   //   ease: "power2.out",
    //   //   // onUpdate: () => {
    //   //   //   camera.lookAt(scene.position);
    //   //   // },
    //   // });
    // });
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
      x: 87.57564986060362,
      y: 58.5400131918718,
      z: 87.37709164687092,
      ease: "power3",
      duration: 1.5,
    });
    gsap.to(this.instance.quaternion, {
      x: -0.007874189719995784,
      y: 0.6189695289058582,
      z: 0.006205993822677122,
      w: 0.7853510075520285,
      ease: "power3",
      duration: 1.2,
    });
  }
  update() {
    // console.log(this.instance.position);
    if (this.controls) {
      this.controls.update();
    }
  }
}
