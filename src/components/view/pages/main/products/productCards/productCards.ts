import { createCustomElement } from '../../../../../../assets/misc/func';
import * as types from '../../../../../../assets/misc/types';
import Products from '../../../../../../products';
import "./productCards.scss";

class ProductCard {

  createButtons() {
    const cardButtonsArea = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__buttons'});
    const cardButtonAddToCart = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'item__button add'});
    const cardButtonDetails = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'item__button details'});
    cardButtonAddToCart.textContent = 'Add to cart';
    cardButtonDetails.textContent = 'Details';
    cardButtonsArea.appendChild(cardButtonAddToCart);
    cardButtonsArea.appendChild(cardButtonDetails);
    return cardButtonsArea;
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
    card.appendChild(this.createButtons());
    cardWrapper.appendChild(card);
    return cardWrapper;
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product__cards'});
    for(let i = 0; i < Products.length; i += 1) {
      container.appendChild(this.createCard(Products[i]));
    }
    (document.querySelector('.product__container') as HTMLDivElement).appendChild(container);
  }
}

export default ProductCard;