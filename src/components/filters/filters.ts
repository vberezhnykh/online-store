import PRODUCTS from "../../products";

abstract class Element {
  _element: HTMLElement;
  constructor(tagName: string, className: string) {
    this._element = document.createElement(tagName);
    this._element.classList.add(className);
  }
}

abstract class List extends Element {
  protected _heading: HTMLHeadingElement;
  protected _savedValues: string[] = [];
  constructor(type: string, className: string) {
    super("div", className);
    this._heading = document.createElement("h3");
    this._heading.classList.add(`${className}_heading`);
    this._heading.textContent = `${type.slice(0, 1).toUpperCase()}${type.slice(
      1
    )}`;
    this._element.appendChild(this._heading);
    const values: { [key: string]: number } = {};
    PRODUCTS.forEach((product) => {
      if (type === "brand" || type === "category") {
        if (!Object.prototype.hasOwnProperty.call(values, product[type]))
          values[product[type]] = 1;
        else values[product[type]]++;
      }
    });
    const container = document.createElement("div");
    container.className = `${type}-list`;
    for (const [key, value] of Object.entries(values)) {
      const item = document.createElement("div");
      item.className = `${type}-list__item`;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = key;
      item.appendChild(input);
      const label = document.createElement("label");
      label.textContent = key;
      item.appendChild(label);
      const span = document.createElement("span");
      span.textContent = `(${value}/${value})`;
      item.appendChild(span);
      container.appendChild(item);
    }
    container.addEventListener("click", (event) => {
      if (event.target instanceof HTMLInputElement) {
        this.saveValues(event.target);
      }
    });
    this._element.appendChild(container);
  }

  saveValues(input: HTMLInputElement) {
    if (!this._savedValues.includes(input.value))
      this._savedValues.push(input.value);
    else {
      const index = this._savedValues.indexOf(input.value);
      this._savedValues.splice(index, 1);
    }
    console.log(this._savedValues);
  }

  render() {
    return this._element;
  }
}

class CategoryList extends List {
  constructor() {
    super("category", "category");
  }
}
class BrandList extends List {
  constructor() {
    super("brand", "brand");
  }
}

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  constructor() {
    super("div", "filters");
    this._categoryFilter = new CategoryList();
    this._element.appendChild(this._categoryFilter.render());
    this._brandsFilter = new BrandList();
    this._element.appendChild(this._brandsFilter.render());
  }
  render() {
    return this._element;
  }
}

export default Filters;
