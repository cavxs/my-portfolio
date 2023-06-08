const sections = ["portfolio", "services", "skills", "github"];
export default class GuiHandler {
  constructor() {
    this.instance = document.getElementById("gui");
    this.guiAnimationsStarted = false;
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
  _startGuiAnimations = () => {
    if (this.guiAnimationsStarted) return;
    this.guiAnimationsStarted = true;
    window.STARTGUIANIMATIONS();
  };
  _initializeListeners = () => {
    window.INITIALIZE_LISTENERS();
  };
  initialize = () => {
    this.instance.classList.toggle("hidden", false);
    this._startGuiAnimations();
    setTimeout(this._initializeListeners, 500);
  };
}
