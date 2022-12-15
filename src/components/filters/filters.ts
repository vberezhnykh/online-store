import PRODUCTS from "../../products";

abstract class Element {
  _element: HTMLElement;
  constructor(tagName: string, className: string) {
    this._element = document.createElement(tagName);
    this._element.classList.add(className);
  }
}

abstract class List extends Element {
  protected _type: string;
  protected _className: string;
  protected _savedValues: string[] = [];
  constructor(type: string, className: string) {
    super("div", className);
    this._type = type;
    this._className = className;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add(`${this._className}__heading`);
    heading.textContent = `${this._type
      .slice(0, 1)
      .toUpperCase()}${this._type.slice(1)}`;
    return heading;
  }

  createItems() {
    const values: { [key: string]: number } = {};
    PRODUCTS.forEach((product) => {
      if (this._type === "brand" || this._type === "category") {
        if (!Object.prototype.hasOwnProperty.call(values, product[this._type]))
          values[product[this._type]] = 1;
        else values[product[this._type]]++;
      }
    });
    const container = document.createElement("div");
    container.className = `${this._type}-list`;
    for (const [key, value] of Object.entries(values)) {
      const item = document.createElement("div");
      item.className = `${this._type}-list__item`;
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
    return container;
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

  draw() {
    this._element.appendChild(this.createHeading());
    this._element.appendChild(this.createItems());
    return this._element;
  }
}

class CategoryList extends List {
  constructor() {
    super("category", "category");
  }
  // добавить метод, который будет проверять брэнд лист
}
class BrandList extends List {
  constructor() {
    super("brand", "brand");
  }
  // добавить метод, который будет проверять лист с категориями
}

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  constructor() {
    super("div", "filters");
    this._categoryFilter = new CategoryList();
    this._brandsFilter = new BrandList();
  }
  draw() {
    this._element.appendChild(this._categoryFilter.draw());
    this._element.appendChild(this._brandsFilter.draw());
    document.querySelector(".page__container")?.append(this._element);
  }
}

export default Filters;
