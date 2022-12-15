import Header from "./header/header";
import Footer from "./footer/footer"

class AppView {
  header: Header;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
  }

  drawHeader() {
    this.header.draw();
    this.footer.draw();
  }
}

export default AppView;