import { Element } from "../abstracts/core";
import { DualSlider } from "../abstracts/core";
import PRODUCTS from "../../../products";

class Stock extends Element {
  _dualSlider: DualSlider;
  _minStock: number;
  _maxStock: number;
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

  draw() {
    this._element.appendChild(this.createHeading());
    this._element.appendChild(
      this._dualSlider.drawDualSlider(this._minStock, this._maxStock)
    );
    return this._element;
  }
}

export default Stock;
