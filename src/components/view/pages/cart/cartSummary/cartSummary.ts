import { createCustomElement } from '../../../../../assets/misc/func';
import * as types from '../../../../../assets/misc/types';
import PRODUCTS from '../../../../../products';
import "./cartSummary.scss";

class CartSummary {

  createHeading() {
    const title = <HTMLDivElement>createCustomElement({selector : 'div', class : 'summary__title title'});
    const heading = <HTMLHeadingElement>createCustomElement({selector : 'h2', class : 'summary__heading heading'});
    heading.textContent = types.CartText.summary;
    title.appendChild(heading);
    return title;
  }

  createPromo() {
    const promo = <HTMLDivElement>createCustomElement({selector : 'div', class : 'summary__promo'});
    const code = <HTMLInputElement>createCustomElement({selector : 'input', class : 'summary__promo-code'});
    const test = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'summary__promo-test'});

    test.textContent = `${types.CartText.summaryPromoTest}${types.CartText.promoTestCodes}`;
    promo.appendChild(code);
    promo.appendChild(test);
    return promo;
  }

  createTotal(data: Pick<types.IProductInfo, 'stock' | 'price'>) {
    const quantity = <HTMLDivElement>createCustomElement({selector : 'div', class : 'summary__content'});
    const amount = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'summary__total-amount'});
    const total = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'summary__total-price'});
    amount.textContent = `${types.CartText.summaryProduct} ${1}`;
    total.textContent = `${types.CartText.summaryTotal} $${data.price}`;
    const btnBuyNow = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'summary__button'});
    btnBuyNow.textContent = 'Buy now'.toUpperCase();
    quantity.appendChild(amount);
    quantity.appendChild(total);
    quantity.appendChild(this.createPromo());
    quantity.appendChild(btnBuyNow);
    return quantity;
  }

  createSummary(data: Omit<types.IProductInfo, 'images'>) {
    const summary = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__summary cart-col'});
    summary.appendChild(this.createHeading());
    summary.appendChild(this.createTotal(data));
    return summary;
  }

  draw() {
    (document.querySelector('.cart__page') as HTMLDivElement).appendChild(this.createSummary(PRODUCTS[0]));
  }
}

export default CartSummary;