import { Element } from "./abstracts/core";
import CategoryList from "./category/category";
import BrandList from "./brand/brand";
import Price from "./price/price";
import Stock from "./stock/stock";

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  _price: Price;
  _stock: Stock;
  constructor() {
    super("aside", "filters");
    this._categoryFilter = new CategoryList();
    this._brandsFilter = new BrandList();
    this._price = new Price();
    this._stock = new Stock();
  }
  draw() {
    this._element.appendChild(this._categoryFilter.draw());
    this._element.appendChild(this._brandsFilter.draw());
    this._element.appendChild(this._price.draw());
    this._element.appendChild(this._stock.draw());
    document.querySelector(".page__container")?.prepend(this._element);
    // this._element.onclick = (event) => this.applyFilter(event);
  }
  applyFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (document.querySelector(".category") instanceof HTMLDivElement) {
        (document.querySelector(".category") as HTMLDivElement).innerHTML = "";
      }
      if (document.querySelector(".brand") instanceof HTMLDivElement) {
        (document.querySelector(".brand") as HTMLDivElement).innerHTML = "";
      }
    }
  }
}

export default Filters;
