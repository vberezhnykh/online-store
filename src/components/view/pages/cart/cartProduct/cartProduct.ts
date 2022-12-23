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

  createOther(data: Pick<types.IProductInfo, 'rating' | 'discountPercentage'>) {
    const other = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__other'});
    const rating = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'other__rating'});
    const discount = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'other__discount'});
    rating.textContent = `Rating: ${data.rating}`;
    discount.textContent = `Rating: ${data.discountPercentage}`;
    other.appendChild(rating);
    other.appendChild(discount);
    return other;
  }

  createDetails(data: Omit<types.IProductInfo, 'images'>) {
    const details = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__details'});
    const title = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__title'});
    const titleText = <HTMLHeadingElement>createCustomElement({selector : 'h3', class : 'title__text'});
    titleText.textContent = data.title;
    title.appendChild(titleText);
    const description = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'item__description'});
    description.textContent = data.description;
    details.appendChild(title);
    details.appendChild(description);
    details.appendChild(this.createOther(data));
    return details;
  }

  createInfo(data: Omit<types.IProductInfo, 'images'>) {
    const info = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__info'});
    const image = <HTMLImageElement>createCustomElement({selector : 'img', class : 'item__image', options : {src : data.thumbnail, alt : `ItemImage`}});
    info.appendChild(image);
    info.appendChild(this.createDetails(data));
    return info;
  }

  createProduct(data: Omit<types.IProductInfo, 'images'>, index: number) {
    const products = <HTMLDivElement>createCustomElement({selector : 'div', class : 'cart__items'});
    const item = <HTMLDivElement>createCustomElement({selector : 'div', class : 'list__item'});
    const itemNumber = <HTMLDivElement>createCustomElement({selector : 'div', class : 'item__number'});
    itemNumber.textContent = `${index}`;
    item.appendChild(itemNumber);
    item.appendChild(this.createInfo(data));
    products.appendChild(item);
    return products;
  }

  draw() {
    (document.querySelector('.cart__page') as HTMLDivElement).appendChild(this.createHeading());
    (document.querySelector('.cart__page') as HTMLDivElement).appendChild(this.createProduct(Products[0], 1));
  }
}

export default CartProduct;