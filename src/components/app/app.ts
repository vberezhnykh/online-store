import AppView from '../view/appView';

class App {
  private view: AppView;

  constructor() {
    this.view = new AppView();
  }

  start() {
    this.view.drawHeader();
  }
  
}

export default App;