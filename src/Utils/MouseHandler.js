import * as THREE from "three";
import Experience from "../Experience";
export default class MouseHandler {
  constructor() {
    this.mousePos = new THREE.Vector2();
    this._experience = new Experience();

    window.addEventListener("mousemove", (e) => {
      this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(
        this.mousePos,
        this._experience.cameraHandler.instance
      );
      if (this._experience.scene?.blocks) {
        const intersects = raycaster.intersectObjects(
          this._experience.scene?.blocks?.hover_objects || []
        );

        for (const obj of this._experience.scene?.blocks?.hover_objects) {
          obj.hover = false;
        }
        if (intersects?.length) {
          this.changeCursor("pointer");
          if (intersects[0].object.hover_effect) {
            intersects[0].object.hover = true;
            // console.log(intersects[0]);
          }
        } else {
          this.changeCursor("default");
        }
      }
      //   console.log(intersects);
    });

    window.addEventListener("click", (e) => {
      this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(
        this.mousePos,
        this._experience.cameraHandler.instance
      );
      if (this._experience.scene?.blocks) {
        const intersects = raycaster.intersectObjects(
          this._experience.scene?.blocks?.hover_objects
        );
        for (const obj of this._experience.scene?.blocks?.hover_objects) {
          obj.hover = false;
        }
        if (intersects?.length) {
          if (intersects[0].object.clickable) {
            intersects[0].object.onclick();
          }
        }
      }
    });
  }

  changeCursor(cursor) {
    document.body.style.cursor = cursor;
  }
}
