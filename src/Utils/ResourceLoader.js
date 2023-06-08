import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class ResourceLoader {
  constructor() {
    this.loader = new GLTFLoader();
  }

  load(cb) {
    this.loader.load("../assets/scene.glb", cb, undefined, (err) =>
      console.error(err)
    );
  }
}
