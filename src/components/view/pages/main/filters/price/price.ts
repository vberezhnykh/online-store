import { BaseElement } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../../../../products";
import { AppliedFilters, Options } from "../../../../../../assets/misc/types";

class Price extends BaseElement {
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
    /* this._filteredMinPrice = this._minPrice;
    this._filteredMaxPrice = this._maxPrice; */
  }
  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add("price__heading");
    heading.textContent = "Price";
    return heading;
  }

  updatePriceView(options: Options) {
    if (
      this._dualSlider._fromSlider &&
      this._dualSlider._fromValue &&
      this._dualSlider._toSlider &&
      this._dualSlider._toValue
    ) {
      this._dualSlider._fromSlider.value = options.price.min.toString();
      this._dualSlider._fromValue.textContent = options.price.min.toString();
      this._dualSlider._toSlider.value = options.price.max.toString();
      this._dualSlider._toValue.textContent = options.price.max.toString();
    }
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
        if (Number(event.target.value) === this._minPrice)
          this._filteredMinPrice = undefined;
        else this._filteredMinPrice = Number(event.target.value);
      } else {
        if (Number(event.target.value) === this._maxPrice)
          this._filteredMaxPrice = undefined;
        else this._filteredMaxPrice = Number(event.target.value);
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
