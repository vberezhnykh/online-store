import AppView from "../view/appView";

class App {
  private view: AppView;

  constructor() {
    this.view = new AppView();
  }

  start() {
    this.view.drawPage();
  }
}

export default App;
