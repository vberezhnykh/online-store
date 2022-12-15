import * as func from '../../misc/func';

class Header {
  createLogoCart(type: string) {
    let parent = <HTMLDivElement>func.createElement1('div', `header__${type}`);
    console.log(parent);
    let link = <HTMLLinkElement>func.createElement1('a', `${type}__link link`);
    console.log(link);
    let linkImg = <HTMLImageElement>func.createElement1('img', `${type}__image`);
    link.setAttribute('href', '#');
    link.textContent = 'Online store';
    link.appendChild(linkImg);
    parent.appendChild(link);
    return link;
  }
  createTotalSum(): HTMLDivElement {
    const headerTotal = <HTMLDivElement>document.createElement('header__total');
    const totalText = <HTMLSpanElement>document.createElement('total__text');
    const totalSum = <HTMLSpanElement>document.createElement('total__sum');
    totalText.textContent = 'Total: $';
    totalSum.textContent = '0.00';
    headerTotal.appendChild(totalText);
    headerTotal.appendChild(totalSum);
    return headerTotal;
  }
  draw() {
    const container = <HTMLDivElement>document.createElement('header__container');
    container.appendChild(this.createLogoCart('logo'));
    container.appendChild(this.createTotalSum());
    container.appendChild(this.createLogoCart('cart'));
    (document.querySelector('.header') as HTMLDivElement).appendChild(container);
  }
}

export default Header;