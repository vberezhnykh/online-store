import CartProduct from './cartProduct/cartProduct';
import CartSummary from './cartSummary/cartSummary';
import { createCustomElement } from '../../../../assets/misc/func';
import './cartPage.scss';

class CartPage {

  product: CartProduct;
  summary: CartSummary;

  constructor() {
    this.product = new CartProduct();
    this.summary = new CartSummary();
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__page'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.product.draw();
    this.summary.draw();
  }
}

export default CartPage;