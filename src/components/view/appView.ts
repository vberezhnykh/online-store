import Header from "./header/header";
import Footer from "./footer/footer";
import Filters from "../filters/filters";

class AppView {
  header: Header;
  footer: Footer;
  main: Filters;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.main = new Filters();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.main.draw();
  }
}

export default AppView;
