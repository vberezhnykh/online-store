import { Element } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../products";

class Price extends Element {
  _dualSlider: DualSlider;
  _prices: number[];
  _minPrice: number;
  _maxPrice: number;
  _filteredMinPrice?: number;
  _filteredMaxPrice?: number;
  constructor() {
    super("div", "price");
    this._dualSlider = new DualSlider();
    this._prices = PRODUCTS.map((product) => product.price).sort(
      (a, b) => a - b
    );
    this._minPrice = this._prices[0];
    this._maxPrice = this._prices[this._prices.length - 1];
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
    this._element.onclick = (event) => this.savePriceFilter(event);
    return this._element;
  }

  savePriceFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement && event.target !== null)
      if (event.target.classList.contains("sliders-control__input--left")) {
        this._filteredMinPrice = Number(event.target.value);
      } else {
        this._filteredMaxPrice = Number(event.target.value);
      }
  }

  get filteredMinPrice() {
    return this._filteredMinPrice;
  }
  get filteredMaxPrice() {
    return this._filteredMaxPrice;
  }
}

export default Price;
