import { BaseElement } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../../../../products";
import { AppliedFilters } from "../../../../../../assets/misc/types";

class Stock extends BaseElement {
  _dualSlider: DualSlider;
  _minStock: number;
  _maxStock: number;
  _filteredMinStock: number;
  _filteredMaxStock: number;
  constructor() {
    super("div", "stock");
    this._dualSlider = new DualSlider();
    this._minStock = Math.min(...PRODUCTS.map((product) => product.stock));
    this._maxStock = Math.max(...PRODUCTS.map((product) => product.stock));
    this._filteredMinStock = this._minStock;
    this._filteredMaxStock = this._maxStock;
  }
  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add("stock__heading");
    heading.textContent = "Stock";
    return heading;
  }

  draw(options?: AppliedFilters) {
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
        this._filteredMinStock = Number(event.target.value);
      } else {
        this._filteredMaxStock = Number(event.target.value);
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
