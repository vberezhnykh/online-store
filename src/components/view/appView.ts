import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Cart from "./pages/cart/cartPage";

class AppView {
  header: Header;
  footer: Footer;
  // page: Main;
  page: Cart;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.page = new Cart();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.page.draw();
  }
}

export default AppView;