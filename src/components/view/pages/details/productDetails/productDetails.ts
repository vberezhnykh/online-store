import { createCustomElement } from '../../../../../assets/misc/func';
import * as types from '../../../../../assets/misc/types';
import Products from '../../../../../products';
import './productDetails.scss';

class ProductDetails {
  createTitle(title: string) {
    const detailsTitle = <HTMLDivElement>createCustomElement({selector : 'div', class : 'details__title'});
    const titleText = <HTMLHeadingElement>createCustomElement({selector : 'h1', class : 'title__text'});
    titleText.textContent = title;
    detailsTitle.appendChild(titleText);
    return detailsTitle;
  }
  createPhotos(data: Pick<types.IProductInfo, 'images' | 'thumbnail'>) {
    const productDataPhotos = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product-data__photos'});
    const productDataSlides = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product-data__slides'});
    for (const imgSrc of data.images) {
      const image = <HTMLImageElement>createCustomElement({selector : 'img', class : 'slides__item'});
      image.src = imgSrc;
      image.alt = 'SlideImage';
      productDataSlides.appendChild(image);
    }
    const productDataThumbnail = <HTMLDivElement>createCustomElement({selector : 'div', class : 'photos__thumbnail'});
    const photo = <HTMLImageElement>createCustomElement({selector : 'img', class : 'thumbnail__item'});
    photo.src = data.thumbnail;
    photo.alt = 'ProductThumbnail';
    productDataThumbnail.appendChild(photo);
    productDataPhotos.appendChild(productDataSlides);
    productDataPhotos.appendChild(productDataThumbnail);
    return productDataPhotos;
  }

  createProductInfo(data: types.IProductInfo) {
    const productInfoWrapper = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product-data__item'});
    const productInfo = Object.entries(data);
    for(let el of productInfo) {
      if (Object.values(types.DetailsOrder).includes(el[0])) {
        const cardCategory = <HTMLHeadingElement>createCustomElement({selector : 'h3', class : 'item__category'});
        const cardCategoryValue = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'item__category-value'});
        let category = el[0].charAt(0).toUpperCase().concat(el[0].slice(1));
        let value = el[1];
        if (el[0] === 'discountPercentage') {
          value = `${el[1]}%`;
          category = 'Discount Percentage';
        }
        cardCategoryValue.textContent = `${value}`;
        cardCategory.textContent = `${category}: `;
        cardCategoryValue.classList.add(`${category.split(' ').join('')}`);
        cardCategory.style.order = `${Object.values(types.DetailsOrder).indexOf(el[0])}`;
        productInfoWrapper.appendChild(cardCategory);
        productInfoWrapper.appendChild(cardCategoryValue);
      }
    }
    return productInfoWrapper;
  }
  createAddCart(price: number) {
    const cart = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product-data__cart'});
    const cartPrice = <HTMLParagraphElement>createCustomElement({selector : 'p', class : 'cart__price'});
    const cartAdd = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'item__button add'});
    const cartBuy = <HTMLButtonElement>createCustomElement({selector : 'button', class : 'item__button details'});
    cartPrice.textContent = `$${price}`;
    cartAdd.textContent = 'Add to cart'.toUpperCase();
    cartBuy.textContent = 'Buy now'.toUpperCase();
    cart.appendChild(cartPrice);
    cart.appendChild(cartAdd);
    cart.appendChild(cartBuy);
    return cart;
  }
  createProductData(data: types.IProductInfo) {
    const productData = <HTMLDivElement>createCustomElement({selector : 'div', class : 'details__product-data'});
    productData.appendChild(this.createPhotos(data));
    productData.appendChild(this.createProductInfo(data));
    productData.appendChild(this.createAddCart(data.price));
    return productData;
  }
  createDetails() {
    const detailsContent = <HTMLDivElement>createCustomElement({selector : 'div', class : 'details__content'});
    detailsContent.appendChild(this.createTitle(Products[0].title));
    detailsContent.appendChild(this.createProductData(Products[0]));
    return detailsContent;
  }

  draw() {
    (document.querySelector('.details__container') as HTMLDivElement).appendChild(this.createDetails());
  }
}

export default ProductDetails;