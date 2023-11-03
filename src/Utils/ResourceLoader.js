import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import glbFile from "../assets/scene.glb";

export default class ResourceLoader {
  constructor() {
    this.loader = new GLTFLoader();
  }

  load(cb) {
    this.loader.load(glbFile, cb, undefined, (err) => console.error(err));
  }
}
