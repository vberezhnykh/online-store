import { Element } from "./abstracts/core";
import CategoryList from "./category/category";
import BrandList from "./brand/brand";
import Price from "./price/price";
import Stock from "./stock/stock";
import PRODUCTS from "../../products";
import { Product } from "../../assets/misc/interfaces";

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  _price: Price;
  _stock: Stock;
  _appliedFilters: {
    category?: string[];
    brand?: string[];
    price?: number[];
    stock?: number[];
  } = {};
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
    this._element.onclick = (event) => this.saveFilter(event);
  }
  saveFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      this._appliedFilters = {};
      if (this._categoryFilter.savedFilters.length !== 0)
        this._appliedFilters.category = this._categoryFilter.savedFilters;
      else delete this._appliedFilters.category;
      if (this._brandsFilter.savedFilters.length !== 0)
        this._appliedFilters.brand = this._brandsFilter.savedFilters;
      else delete this._appliedFilters.brand;
      this.showFilteredProducts();
    }
  }

  showFilteredProducts() {
    let filteredProducts = [...PRODUCTS];
    if (Object.keys(this._appliedFilters).length !== 0) {
      // фильтруем по категории
      if (
        Object.prototype.hasOwnProperty.call(this._appliedFilters, "category")
      ) {
        filteredProducts = filteredProducts.filter((product) => {
          if (
            this._appliedFilters.category?.includes(
              product.category.toLowerCase()
            )
          )
            return product;
        });
      }
      // фильтруем по бренду
      if (Object.prototype.hasOwnProperty.call(this._appliedFilters, "brand")) {
        filteredProducts = filteredProducts.filter((product) => {
          if (this._appliedFilters.brand?.includes(product.brand.toLowerCase()))
            return product;
        });
      }
    }
    console.log(filteredProducts);
  }
}

export default Filters;
