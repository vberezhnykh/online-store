import ProductCard from "./productCards/productCards";
import FuncArea from "./productCardsFuncArea/funcArea";
import { createCustomElement } from '../../../../../assets/misc/func';
import './product.scss';
class Products {

  cardArea: ProductCard;
  funcArea: FuncArea;

  constructor() {
    this.cardArea= new ProductCard();
    this.funcArea= new FuncArea();
  }

  draw() {
    const container = <HTMLElement>createCustomElement({selector : 'section', class : 'product__container'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.funcArea.draw();
    this.cardArea.draw();
  }
}

export default Products;