import Header from "./header/header";
import Footer from "./footer/footer"

class AppView {
  header: Header;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
  }
}

export default AppView;