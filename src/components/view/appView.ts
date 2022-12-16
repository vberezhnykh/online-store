import Header from "./header/header";
import Footer from "./footer/footer";
import ProductCard from "../view/pages/main/productCards";

class AppView {
  header: Header;
  footer: Footer;
  card: ProductCard;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.card = new ProductCard();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    this.card.draw();
  }
}

export default AppView;