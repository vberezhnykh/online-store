import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Filters from "./pages/main/filters/filters";

class AppView {
  header: Header;
  footer: Footer;
  page: Main;
  filters: Filters;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.page = new Main();
    this.filters = new Filters(this.page);
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.page.draw();
    this.filters.draw();
  }
}

export default AppView;
