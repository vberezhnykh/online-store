import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Cart from "./pages/cart/cartPage";
import Filters from "./pages/main/filters/filters";

class AppView {
  header: Header;
  footer: Footer;
  pageMain: Main;
  filters: Filters;
  // page: Cart;

  constructor() {
    this.pageMain = new Main();
    this.filters = new Filters(this.pageMain);
    this.header = new Header(this.pageMain, this.filters);
    this.footer = new Footer();
    // this.page = new Cart();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.pageMain.draw();
    this.filters.draw();
    // this.page.draw();
  }
}

export default AppView;
