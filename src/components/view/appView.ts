import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Details from "./pages/details/detailsPage";

class AppView {
  header: Header;
  footer: Footer;
  //page: Main;
  page: Details;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.page = new Details();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.page.draw();
  }
}

export default AppView;