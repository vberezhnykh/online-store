import { createCustomElement } from '../../../../../assets/misc/func';
import * as types from '../../../../../assets/misc/types';
import Products from '../../../../../products';
import "./cartProduct.scss";

class CartProduct {

  createLimitControl() {
    const limit = <HTMLDivElement>createCustomElement({selector : 'div', class : 'control__limit'});
    const limitText = <HTMLDivElement>createCustomElement({selector : 'span', class : 'limit__text'});
    const limitAmount= <HTMLInputElement>createCustomElement({selector : 'input', class : 'limit__amount'});
    limitText.textContent = types.CartText.titleItemLimit.toUpperCase();
    limitAmount.type = 'text';
    limitAmount.value = `${types.CartDefaultTitle.items}`;
    limit.appendChild(limitText);
    limit.appendChild(limitAmount);
    return limit;
  }

  createPageControl() {
    const page = <HTMLDivElement>createCustomElement({selector : 'div', class : 'control__page'});
    const pageText = <HTMLDivElement>createCustomElement({selector : 'span', class : 'page__text'});
    const pageAmount = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'page__amount'});
    const pageBtnPrev = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'page__button prev'});
    const pageBtnNext = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'page__button next'});
    pageText.textContent = types.CartText.titlePageAmount.toUpperCase();
    pageAmount.textContent = `${types.CartDefaultTitle.pages}`;
    pageBtnPrev.textContent = '<';
    pageBtnNext.textContent = '>';
    page.appendChild(pageText);
    page.appendChild(pageBtnPrev);
    page.appendChild(pageAmount);
    page.appendChild(pageBtnNext);
    return page;
  }

  createControl() {
    const control = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product__control'});
    control.appendChild(this.createLimitControl());
    control.appendChild(this.createPageControl());
    return control;
  }

  createHeading() {
    const title = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product__title'});
    const heading = <HTMLHeadingElement>createCustomElement({selector : 'h2', class : 'product__heading'});
    heading.textContent = types.CartText.title;
    title.appendChild(heading);
    title.appendChild(this.createControl());
    return title;
  }

  createCard(data: Omit<types.IProductInfo, 'images'>) {
    const cardWrapper = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__wrapper'});
    cardWrapper.style.order = `${data.id}`;
    const card = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__item'});
    const cardHeading = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__heading'});
    const cardItemTitle = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'item__category-value title'});
    cardItemTitle.textContent = data.title;
    cardHeading.appendChild(cardItemTitle);
    const cardItemDetailsWrapper = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__details-wrapper'});
    const cardItemDetails = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__details'});
    const cardInfo = Object.entries(data);
    for(let el of cardInfo) {
      if (Object.values(types.CardDetailsOrder).includes(el[0])) {
        const cardCategory = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'item__category'});
        const cardCategoryValue = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'item__category-value'});
        let category = el[0].charAt(0).toLocaleUpperCase().concat(el[0].slice(1));
        let value = el[1];
        if (el[0] === 'discountPercentage') {
          value = `${el[1]}%`;
          category = 'Discount';
        }
        cardCategoryValue.textContent = `${value}`;
        cardCategory.textContent = `${category}: `;
        cardCategoryValue.classList.add(`${category}`);
        if (el[0] === 'price') {
          cardCategory.textContent += '$';
        }
        cardCategory.appendChild(cardCategoryValue);
        cardCategory.style.order = `${Object.values(types.CardDetailsOrder).indexOf(el[0])}`;
        cardItemDetails.appendChild(cardCategory);
      }
    }
    cardItemDetailsWrapper.appendChild(cardHeading);
    cardItemDetailsWrapper.appendChild(cardItemDetails);
    card.style.background = `url(${data.thumbnail}) 0% 0% / cover`;
    card.appendChild(cardItemDetailsWrapper);
    cardWrapper.appendChild(card);
    return cardWrapper;
  }

  draw() {
    (document.querySelector('.cart__page') as HTMLDivElement).appendChild(this.createHeading());
  }
}

export default CartProduct;