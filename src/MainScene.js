import * as THREE from "three";
import Experience from "./Experience";
import Block from "./Objects/Block";

import gsap from "gsap";

import Blocks from "./Objects/Blocks";
export default class MainScene {
  constructor() {
    this.instance = new THREE.Scene();

    this.experience = new Experience();
    this.sceneObjects = [];
    this.hover_objects = [];
    this.initial_click = false;
    this.current_section = null;

    this._starSpeed = 0.0001;
    this._initialStarSpeed = 0.0001;

    this._debug_gui = false;
  }

  makeWorld(loaded = null) {
    // original colors
    // const light1 = new THREE.DirectionalLight(0xe100ff);
    // const light2 = new THREE.DirectionalLight(0xff9300);

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    //   "assets/starscape_2.png",
    // ]);
    // this.instance.background = texture;
    console.log(loaded.scene.children);

    const sunup = loaded.scene.children.find((x) => x.name === "sunup");
    const sunleft = loaded.scene.children.find((x) => x.name === "sunleft");
    const sunright = loaded.scene.children.find((x) => x.name === "sunright");
    const starlight = loaded.scene.children
      .find((x) => x.name === "Cube002")
      .children.find((x) => x.name === "starlight");
    const diamondlight = loaded.scene.children
      .find((x) => x.name === "Cube")
      .children.find((x) => x.name === "Point");
    const startlight = loaded.scene.children
      .find((x) => x.name === "Cube004")
      .children.find((x) => x.name === "startlight");
    console.log(diamondlight);
    // sunup.castShadow = true;
    // console.log(sunup);

    // const person = loaded.scene.children.find((x) => x.name === "person");
    // const tloader = new THREE.TextureLoader();

    // person.material.transparent = true;

    // person.material.flipY = true;
    // person.material.map = tloader.load("../assets/person_texture.jpg");
    // console.log(person.material);

    // sunup.intensity = 2;
    // 2
    sunup.intensity = 0.7;
    // sunright.intensity = 3;
    // 2
    sunright.intensity = 0.9;
    // sunleft.intensity = 10;
    // 7
    sunleft.intensity = 1;
    // 661
    starlight.intensity = 0.3;
    diamondlight.intensity = 0.8;
    startlight.intensity = 0.8;
    // console.log(loaded.scene.children);

    this.backgroundGradient(0x000000, 0x040921);
    this.stars();

    const maxScrollUp = 600;
    const maxScrollDown = -50;

    window.addEventListener("wheel", (e) => {
      const scrollDelta = -e.deltaY;

      const currentPosition = this.starSystem.position.y;
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

      const normalizedWheelDelta = Math.max(-1, Math.min(1, scrollDelta));

      const scrollStep = 200; // Adjust this value to change the scroll speed

      gsap.to(this.experience.gui.instance, {
        scrollTop:
          this.experience.gui.instance.scrollTop -
          scrollStep * normalizedWheelDelta,
        duration: 0.2,
      });
      this.experience.gui.instance.scrollTop += 10;
      // Move the camera to the target position
      if (this.current_section) {
        gsap.to(this.starSystem.position, {
          y: targetPosition,
          duration: 0.5,
          ease: "power2.out",
          // onUpdate: () => {
          //   console.log(this.starSystem.position);
          // },
        });
      }
      // this._starSpeed = this._initialStarSpeed * scrollDelta * 10;
    });

    // const light1 = new THREE.DirectionalLight(0x9086a7); // purple
    // const light2 = new THREE.DirectionalLight(0xffdeb0);
    // const light3 = new THREE.HemisphereLight(0xd9cebf);
    // const light4 = new THREE.DirectionalLight(0xffffff);

    // const light1 = new THREE.DirectionalLight(0xffffff);
    // const light1helper = new THREE.DirectionalLightHelper(light1, 5);
    // light1.position.set(0, 50, 0);
    // light1.intensity = 1;
    // const light1helper =
    // light2.position.set(0, 19, 60);
    // light2.intensity = 1;

    // light1.position.set(60, 19, 3);
    // light1.intensity = 1;
    // light3.intensity = 0.5;

    // light4.position.set(0, 50, 0);
    // light4.intensity = 0.3;
    // const light1helper = new THREE.DirectionalLightHelper(light1, 5);
    // const light2helper = new THREE.DirectionalLightHelper(light2, 5);
    // this.instance.add(light1);
    // this.instance.add(light2);
    // this.instance.add(light3);
    // this.instance.add(light4);
    // this.instance.add(light1helper);
    // this.instance.add(light2helper);
    this.blocks = new Blocks(loaded.scene.children);

    this.instance.add(loaded.scene);

    this.addToScene(this.blocks);

    if (this._debug_gui) this.startInitialClick();
  }
  removeFromScene(obj) {
    const mesh = obj.mesh;
    const uuid = obj.mesh.uuid;
    this.sceneObjects = this.sceneObjects.filter(
      (item) => !(item.mesh.uuid === uuid)
    );
    this.instance.remove(mesh);
  }
  stars() {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = Math.random() * 2000 - 1000;
      positions[i + 1] = Math.random() * 2000 - 1000;
      positions[i + 2] = Math.random() * 2000 - 1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffff8b });
    const particleSystem = new THREE.Points(geometry, material);

    this.starSystem = particleSystem;
    this.instance.add(particleSystem);
  }
  backgroundGradient(start, end) {
    // Define the gradient colors
    const color1 = new THREE.Color(start); // Starting color
    const color2 = new THREE.Color(end); // Ending color

    // Create a gradient texture
    const canvas = document.createElement("canvas");
    canvas.width = 2500;
    canvas.height = 2500;
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color1.getStyle());
    gradient.addColorStop(1, color2.getStyle());
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.gammaFactor = 2.2;
    // Set the background texture
    this.instance.background = texture;
  }
  startInitialClick() {
    this.initial_click = true;
    this.current_section = "home";
    this.experience.gui.selectSection("home");
    this.experience.cameraHandler.initialClickSetup();
    setTimeout(() => {
      this.experience.gui.initialize();
    }, 500);
  }
  addToScene(obj, pos) {
    this.instance.add(obj.mesh);
    this.sceneObjects.push(obj);
    if (pos) obj.mesh.position.copy(pos);
  }

  update() {
    for (const obj of this.sceneObjects) {
      if (obj?.update) obj.update();
    }
    if (this.starSystem) {
      // console.logthis.particleSystem
      this.starSystem.rotation.x += this._starSpeed;
      this.starSystem.rotation.y += this._starSpeed;
    }
  }
}
