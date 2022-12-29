import CartProduct from './cartProduct/cartProduct';
import CartSummary from './cartSummary/cartSummary';
import { createCustomElement } from '../../../../assets/misc/func';
import './cartPage.scss';
import PRODUCTS from '../../../../products';

class CartPage {

  product: CartProduct;
  summary: CartSummary;

  constructor() {
    this.product = new CartProduct();
    this.summary = new CartSummary();
  }

  fillTotals() {
    const totalAmount = Array.from(document.querySelectorAll('.item__count')).reduce(
      (sum, curr) => sum + Number(curr.textContent) 
    , 0);
    const totalPrice = Array.from(document.querySelectorAll('.item__price')).reduce(
      (sum, curr) => sum + Number(curr.textContent?.split('$').reverse()[0]) 
    , 0);
    (document.querySelector('.total-amount') as HTMLSpanElement).textContent = `${totalAmount}`;
    (document.querySelector('.header__cart') as HTMLDivElement).setAttribute('data-value',`${totalAmount}`);
    (document.querySelector('.total-price') as HTMLSpanElement).textContent = `$${totalPrice}`;
    (document.querySelector('.total__sum') as HTMLSpanElement).textContent = `${totalPrice}`;
  }

  hideCartItems(page: number = 1) {
    const limit = Number((document.querySelector('.limit__amount') as HTMLInputElement).value);
    const items = Array.from(document.querySelectorAll('.cart__items')).map((el, i) => {
      (el as HTMLDivElement).style.display = (i >= limit * (page - 1) && i < limit * page) ? '' : 'none';
    });
  }

  createFunctions() {
    const area: HTMLDivElement | null = document.querySelector('.cart__products');
    if (area) {
      area.addEventListener('click',(event) => {
        const target = event.target as HTMLElement;
        if (target.className.includes('limit__amount')) {
          console.log('in');
        }
        if (target.className.includes('page__button')) {
          const limit = Number((document.querySelector('.limit__amount') as HTMLInputElement).value);
          const maxPage = Math.ceil(document.querySelectorAll('.list__item').length / limit);
          let currPage = Number(document.querySelector('.page__amount')?.textContent);
          const step = target.className.includes('prev') ? -1 : 1;
          if (currPage + step > 0 && currPage + step <= maxPage) {
            currPage += step;
          }
          this.hideCartItems(currPage);
          (document.querySelector('.page__amount') as HTMLSpanElement).textContent = `${currPage}`;
        }
        if (target.className.includes('item__button')) {
          const parent = target.closest('.cart__items');
          if (parent) {
            const stock = Number((parent.querySelector('.item__stock') as HTMLSpanElement).textContent?.split(' ').reverse()[0]);
            const itemTitle = (parent.querySelector('.title__text') as HTMLHeadingElement).textContent;
            const price = PRODUCTS.filter(item => item.title.toLowerCase().includes(`${itemTitle}`.toLowerCase()))[0].price;
            let amount = Number(parent.querySelector('.item__count')?.textContent);
            const step = target.className.includes('plus') ? 1 : -1;
            if (amount + step > 0 && amount + step <= stock) {
              amount += step;
              (parent.querySelector('.item__count') as HTMLSpanElement).textContent = `${amount}`;
              (parent.querySelector('.item__price') as HTMLSpanElement).textContent = `$${amount * price}`;
            } else if (amount + step === 0) {
              parent.remove();
            }
            this.fillTotals();
          }
        }
      });
    }
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__page'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.product.draw();
    this.summary.draw();
    this.fillTotals();
    this.createFunctions();
    this.hideCartItems();
  }
}

export default CartPage;