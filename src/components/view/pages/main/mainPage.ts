import Products from "./products/products";
import './mainPage.scss';

class MainPage {

  products: Products;

  constructor() {
    this.products= new Products();
  }

  draw() {
    this.products.draw();
  }
}

export default MainPage;