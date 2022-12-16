import { Element } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../products";

class Price extends Element {
  _dualSlider: DualSlider;
  _minPrice: number;
  _maxPrice: number;
  constructor() {
    super("div", "price");
    this._dualSlider = new DualSlider();
    this._minPrice = Math.min(...PRODUCTS.map((product) => product.price));
    this._maxPrice = Math.max(...PRODUCTS.map((product) => product.price));
  }
  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add("price__heading");
    heading.textContent = "Price";
    return heading;
  }

  draw() {
    this._element.appendChild(this.createHeading());
    this._element.appendChild(
      this._dualSlider.drawDualSlider(this._minPrice, this._maxPrice)
    );
    return this._element;
  }
}

export default Price;
