import { BaseElement } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../../../../products";
import { Options } from "../../../../../../assets/misc/types";

class Stock extends BaseElement {
  _dualSlider: DualSlider;
  _minStock: number;
  _maxStock: number;
  _filteredMinStock?: number;
  _filteredMaxStock?: number;
  constructor() {
    super("div", "stock");
    this._dualSlider = new DualSlider();
    this._minStock = Math.min(...PRODUCTS.map((product) => product.stock));
    this._maxStock = Math.max(...PRODUCTS.map((product) => product.stock));
  }
  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add("stock__heading");
    heading.textContent = "Stock";
    return heading;
  }

  updateStockView(options: Options) {
    if (
      this._dualSlider._fromSlider &&
      this._dualSlider._fromValue &&
      this._dualSlider._toSlider &&
      this._dualSlider._toValue &&
      options.stock.max &&
      options.stock.min
    ) {
      this._dualSlider._fromSlider.value = options.stock.min.toString();
      this._dualSlider._fromValue.textContent = options.stock.min.toString();
      this._dualSlider._toSlider.value = options.stock.max.toString();
      this._dualSlider._toValue.textContent = options.stock.max.toString();
    }
  }

  draw() {
    this._element.innerHTML = "";
    this._element.appendChild(this.createHeading());
    this._element.appendChild(
      this._dualSlider.drawDualSlider(this._minStock, this._maxStock)
    );
    this._element.onclick = (event) => this.saveStockFilter(event);
    return this._element;
  }

  saveStockFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement && event.target !== null)
      if (event.target.classList.contains("sliders-control__input--left")) {
        if (Number(event.target.value) === this._minStock)
          this._filteredMinStock = undefined;
        else this._filteredMinStock = Number(event.target.value);
      } else {
        if (Number(event.target.value) === this._maxStock)
          this._filteredMaxStock = undefined;
        else this._filteredMaxStock = Number(event.target.value);
      }
  }

  get filteredMinStock() {
    return this._filteredMinStock;
  }
  get filteredMaxStock() {
    return this._filteredMaxStock;
  }
}

export default Stock;
