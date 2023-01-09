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
  cart: Cart;

  constructor() {
    this.pageMain = new Main();
    this.filters = new Filters(this.pageMain);
    this.cart = new Cart(this.pageMain.products.cardArea._productsInCart);
    this.header = new Header(this.pageMain, this.filters, this.cart);
    this.footer = new Footer();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.pageMain.draw();
    this.filters.draw();
  }
}

export default AppView;
