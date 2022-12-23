import CartProduct from './cartProduct/cartProduct';
import { createCustomElement } from '../../../../assets/misc/func';
import './cartPage.scss';

class CartPage {

  product: CartProduct;

  constructor() {
    this.product= new CartProduct();
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__page'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.product.draw();
  }
}

export default CartPage;