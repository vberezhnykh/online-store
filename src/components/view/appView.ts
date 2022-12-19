import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";

class AppView {
  header: Header;
  footer: Footer;
  page: Main;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.page = new Main();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.page.draw();
  }
}

export default AppView;