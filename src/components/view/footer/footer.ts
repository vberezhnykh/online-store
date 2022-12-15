import { createCustomElement } from '../../../assets/misc/func';

class Footer {
  draw() {
    const footer = (document.querySelector('.footer') as HTMLElement);
    const footerText = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'footer__text'});
    footerText.textContent = 'Online store';
    footer.appendChild(footerText);
  }
}

export default Footer;