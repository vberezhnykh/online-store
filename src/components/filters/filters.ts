import { Element } from "./abstracts/core";
import CategoryList from "./category/category";
import BrandList from "./brand/brand";
import Price from "./price/price";
import Stock from "./stock/stock";
import PRODUCTS from "../../products";

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  _price: Price;
  _stock: Stock;
  _appliedFilters: {
    category?: string[];
    brand?: string[];
    price?: { [key: string]: number };
    stock?: { [key: string]: number };
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
      if (this._price.filteredMinPrice || this._price.filteredMaxPrice) {
        this._appliedFilters.price = {};
        if (this._price.filteredMinPrice)
          this._appliedFilters.price.min = this._price
            .filteredMinPrice as number;
        else
          this._appliedFilters.price.max = this._price
            .filteredMaxPrice as number;
      }
      if (this._stock.filteredMinStock || this._stock.filteredMaxStock) {
        this._appliedFilters.stock = {};
        if (this._stock.filteredMinStock)
          this._appliedFilters.stock.min = this._stock
            .filteredMinStock as number;
        else
          this._appliedFilters.stock.max = this._stock
            .filteredMaxStock as number;
      }
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
      // фильтруем по цене
      if (Object.prototype.hasOwnProperty.call(this._appliedFilters, "price")) {
        if (this._appliedFilters.price !== undefined) {
          if (this._appliedFilters.price.min) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.price !== undefined)
                return product.price >= this._appliedFilters.price.min;
            });
          }
          if (this._appliedFilters.price.max) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.price !== undefined)
                return product.price <= this._appliedFilters.price.max;
            });
          }
        }
      }
      // фильтруем по наличию на складе
      if (Object.prototype.hasOwnProperty.call(this._appliedFilters, "stock")) {
        if (this._appliedFilters.stock !== undefined) {
          if (this._appliedFilters.stock.min) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.stock !== undefined)
                return product.stock >= this._appliedFilters.stock.min;
            });
          }
          if (this._appliedFilters.stock.max) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.stock !== undefined)
                return product.stock <= this._appliedFilters.stock.max;
            });
          }
        }
      }
    }
    console.log(filteredProducts);
  }
}

export default Filters;
