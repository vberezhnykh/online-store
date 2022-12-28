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
    const code = <HTMLInputElement>createCustomElement({selector : 'input', class : 'promo__code'});
    const test = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'promo__test'});
    code.type = 'search';
    code.value = 'Enter promo code here';
    test.textContent = `${types.CartText.summaryPromoTest}${types.CartText.promoTestCodes}`;
    promo.appendChild(code);
    promo.appendChild(test);
    return promo;
  }

  createTotal(data: Pick<types.IProductInfo, 'price'>) {
    const total = <HTMLDivElement>createCustomElement({selector : 'div', class : 'summary__total'});
    const totalAmount = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'total__text'});
    const totalPrice = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'total__text'});
    const totalAmountValue = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'total__value total-amount'});
    const totalPriceValue = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'total__value total-price'});
    totalAmount.textContent = `${types.CartText.summaryProduct}`;
    totalAmountValue.textContent = ` ${1}`;
    totalAmount.appendChild(totalAmountValue);
    totalPrice.textContent = `${types.CartText.summaryTotal}`;
    totalPriceValue.textContent = ` $${data.price}`;
    totalPrice.appendChild(totalPriceValue);
    total.appendChild(totalAmount);
    total.appendChild(totalPrice);
    return total;
  }

  createContent(data: Pick<types.IProductInfo, 'price'>) {
    const quantity = <HTMLDivElement>createCustomElement({selector : 'div', class : 'summary__content'});
    const btnBuyNow = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'summary__button'});
    btnBuyNow.textContent = 'Buy now'.toUpperCase();
    quantity.appendChild(this.createTotal(data));
    quantity.appendChild(this.createPromo());
    quantity.appendChild(btnBuyNow);
    return quantity;
  }

  createSummary(data: Omit<types.IProductInfo, 'images'>) {
    const summary = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__summary cart-col'});
    summary.appendChild(this.createHeading());
    summary.appendChild(this.createContent(data));
    return summary;
  }

  draw() {
    (document.querySelector('.cart__page') as HTMLDivElement).appendChild(this.createSummary(PRODUCTS[0]));
  }
}

export default CartSummary;