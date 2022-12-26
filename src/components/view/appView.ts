import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Cart from "./pages/cart/cartPage";
import Filters from "./pages/main/filters/filters";
import Details from "./pages/details/detailsPage";

class AppView {
  header: Header;
  footer: Footer;
  pageMain: Main;
  page: Cart;
  //filters: Filters;
  //page: Details;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.page = new Cart();
    this.pageMain = new Main();
    //this.filters = new Filters(this.pageMain);
    //this.page = new Details();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.page.draw();
    //this.filters.draw();
  }
}

export default AppView;
