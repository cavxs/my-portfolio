const sections = ["portfolio", "services", "skills", "github"];
export default class GuiHandler {
  constructor() {
    this.instance = document.getElementById("gui");
  }

  selectSection = (sec) => {
    if (sec !== "github") {
      sections.forEach((s) => {
        this.instance.classList.remove(s);
      });
      this.instance.classList.add(sec);
    } else {
      //TODO: go to my github
    }
  };
}
