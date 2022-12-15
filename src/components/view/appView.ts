import Header from "./header/header";

class AppView {
  header: Header;

  constructor() {
    this.header = new Header;
  }

  drawHeader() {
    this.header.draw();
  }
}

export default AppView;