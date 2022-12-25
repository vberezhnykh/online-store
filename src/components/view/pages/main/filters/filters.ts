import { BaseElement } from "./abstracts/core";
import CategoryList from "./category/category";
import BrandList from "./brand/brand";
import Price from "./price/price";
import Stock from "./stock/stock";
import PRODUCTS from "../../../../../products";
import {
  IProductInfo,
  AppliedFilters,
  Options,
} from "../../../../../assets/misc/types";
import MainPage from "../mainPage";

class Filters extends BaseElement {
  _Page: MainPage;
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  _price: Price;
  _stock: Stock;
  _appliedFilters: AppliedFilters = {};
  _filteredProducts: Array<IProductInfo> = [];
  constructor(page: MainPage) {
    super("aside", "filters");
    this._Page = page;
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
      if (this._brandsFilter.savedFilters.length !== 0)
        this._appliedFilters.brand = this._brandsFilter.savedFilters;
      if (this._price._filteredMinPrice) {
        if (!this._appliedFilters.price) this._appliedFilters.price = {};
        this._appliedFilters.price.min = this._price._filteredMinPrice;
      }
      if (this._price._filteredMaxPrice) {
        if (!this._appliedFilters.price) this._appliedFilters.price = {};
        this._appliedFilters.price.max = this._price._filteredMaxPrice;
      }
      if (this._stock.filteredMinStock) {
        if (!this._appliedFilters.stock) this._appliedFilters.stock = {};
        this._appliedFilters.stock.min = this._stock._filteredMinStock;
      }
      if (this._stock._filteredMaxStock) {
        if (!this._appliedFilters.stock) this._appliedFilters.stock = {};
        this._appliedFilters.stock.max = this._stock._filteredMaxStock;
      }
      this.filterProducts();
      this.updateView(event);
    }
  }

  /* clearView() {
    this._element.innerHTML = "";
    if (document.querySelector(".page__container") !== null)
      (document.querySelector(".page__container") as HTMLElement).innerHTML =
        "";
    this._categoryFilter._element.innerHTML = "";
    this._brandsFilter._element.innerHTML = "";
    this._price._element.innerHTML = "";
    this._stock._element.innerHTML = "";
  } */

  updateView(event: MouseEvent) {
    const options = {} as Options;
    const keys = ["category", "brand", "price", "stock"];
    for (const key of keys) {
      const prop: { [key: string]: number } = {};
      if (key === "category" || key === "brand") {
        this._filteredProducts.forEach((product) => {
          if (!Object.prototype.hasOwnProperty.call(prop, product[key]))
            prop[product[key]] = 1;
          else prop[product[key]]++;
        });
        options[key] = prop;
      } else if (key === "price" || key === "stock") {
        const values = this._filteredProducts
          .map((product) => product[key])
          .sort((a, b) => a - b);
        prop.min = values[0];
        prop.max = values[values.length - 1];
        options[key] = prop;
      }
    }
    this._categoryFilter.updateCategoryView(event, options);
    this._brandsFilter.updateBrandView(event, options);
    this._price.updatePriceView(options);
    this._stock.updateStockView(options);
    this.updateCardsView();
  }

  filterProducts() {
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
          let minPrice: number;
          if (this._appliedFilters.price.min)
            minPrice = this._appliedFilters.price.min;
          else minPrice = this._price._minPrice;
          filteredProducts = filteredProducts.filter((product) => {
            return product.price >= minPrice;
          });
          let maxPrice: number;
          if (this._appliedFilters.price.max)
            maxPrice = this._appliedFilters.price.max;
          else maxPrice = this._price._maxPrice;
          filteredProducts = filteredProducts.filter((product) => {
            return product.price <= maxPrice;
          });
        }
      }
      // фильтруем по наличию на складе
      if (Object.prototype.hasOwnProperty.call(this._appliedFilters, "stock")) {
        if (this._appliedFilters.stock !== undefined) {
          if (this._appliedFilters.stock.min) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.stock?.min)
                return product.stock >= this._appliedFilters.stock.min;
            });
          }
          if (this._appliedFilters.stock.max) {
            filteredProducts = filteredProducts.filter((product) => {
              if (this._appliedFilters.stock?.max)
                return product.stock <= this._appliedFilters.stock.max;
            });
          }
        }
      }
    }
    this._filteredProducts = filteredProducts;
  }

  updateCardsView() {
    if (
      document.querySelector(".product__cards") &&
      document.querySelector(".stat__count")
    ) {
      (document.querySelector(".product__cards") as HTMLElement).remove();
      if (Object.keys(this._appliedFilters).length !== 0) {
        this._Page.products.cardArea.draw(this._filteredProducts);
        (
          document.querySelector(".stat__count") as HTMLElement
        ).textContent = `${this._filteredProducts.length}`;
      } else {
        this._Page.products.cardArea.draw();
        (document.querySelector(".stat__count") as HTMLElement).textContent =
          "100";
      }
    }
  }
}

export default Filters;
