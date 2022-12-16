import { createCustomElement } from "../../assets/misc/func";
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
  protected _appliedFilters: { [key: string]: string[] } = {};
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
      input.className = `${this._type}-list__input`;
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
      this.updateFilterView(event);
      // this.saveFilter(event);
      // this._appliedFilters =
    });
    return container;
  }

  private updateFilterView(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      // выделить текущий элемент и снять клик с других элементов
      const listItem = event.target.parentElement;
      if (listItem !== null) {
        // на все фильтры добавляем неактивный фильтр
        document
          .querySelectorAll(`.${this._type}-list__item`)
          .forEach((element) => {
            if (
              event.target !== null &&
              event.target instanceof HTMLInputElement &&
              event.target.checked
            ) {
              element.classList.remove(`${this._type}-list__item--active`);
              element.classList.add(`${this._type}-list__item--inactive`);
            } else {
              element.classList.remove(`${this._type}-list__item--inactive`);
            }
          });
        listItem.classList.remove(`${this._type}-list__item--inactive`);
        listItem.classList.toggle(`${this._type}-list__item--active`);
      }
      // снимаем чекбокс со всех инпутов
      document
        .querySelectorAll(`.${this._type}-list__input`)
        .forEach((input) => {
          if (input instanceof HTMLInputElement && input !== event.target) {
            input.checked = false;
          }
        });
    }
  }

  saveFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement)
      if (event.target.checked) console.log(event.target.value);
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

class DualSlider {
  _fromSlider?: HTMLInputElement;
  _toSlider?: HTMLInputElement;
  _fromValue?: HTMLSpanElement;
  _toValue?: HTMLSpanElement;
  drawDualSlider(minValue: number, maxValue: number) {
    // создаем контейнер
    const container = createCustomElement({
      selector: "div",
      class: "range-container",
    });
    // создаем блок управления слайдера
    const slidersControl = createCustomElement({
      selector: "div",
      class: "sliders-control",
    });
    // создаем два инпута
    for (let i = 0; i < 2; i++) {
      const input = <HTMLInputElement>createCustomElement({
        selector: "input",
        class: "sliders-control__input",
      });
      input.type = "range";
      input.min = minValue.toString();
      input.max = maxValue.toString();
      if (i === 0) {
        input.value = minValue.toString();
        input.classList.add("sliders-control__input--left");
        this._fromSlider = input;
        this._fromSlider.oninput = () => this.controlFromSlider();
      } else {
        input.value = maxValue.toString();
        input.classList.add("sliders-control__input--right");
        this._toSlider = input;
        this._toSlider.oninput = () => this.controlToSlider();
      }
      slidersControl.appendChild(input);
    }
    container.appendChild(slidersControl);
    // создаем управление для инпутов
    const formControl = createCustomElement({
      selector: "div",
      class: "out-data",
    });
    // создаем отображение минимального и максимального значения
    for (let i = 0; i < 2; i++) {
      const value = createCustomElement({
        selector: "span",
        class: "out-data__value",
      });
      if (i === 0) {
        value.textContent = minValue.toString();
        value.classList.add("out-data__value--from");
        this._fromValue = value;
      } else {
        value.textContent = maxValue.toString();
        value.classList.add("out-data__value--to");
        this._toValue = value;
      }
      formControl.appendChild(value);
    }
    container.appendChild(formControl);
    return container;
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    if (this._toSlider) {
      if (Number(currentTarget.value) <= 0) {
        this._toSlider.style.zIndex = "2";
      } else this._toSlider.style.zIndex = "0";
    }
  }

  controlFromSlider() {
    if (this._fromSlider && this._toSlider && this._fromValue) {
      const [from, to] = this.getParsed(this._fromSlider, this._toSlider);
      if (from > to) this._fromSlider.value = to.toString();
      this._fromValue.textContent = this._fromSlider.value;
    }
  }

  controlToSlider() {
    if (this._fromSlider && this._toSlider && this._toValue) {
      const [from, to] = this.getParsed(this._fromSlider, this._toSlider);
      this.setToggleAccessible(this._toSlider);
      if (from <= to) this._toSlider.value = to.toString();
      else this._toSlider.value = from.toString();
      this._toValue.textContent = this._toSlider.value;
    }
  }
}

class Price extends Element {
  _dualSlider: DualSlider;
  _minPrice: number;
  _maxPrice: number;
  constructor() {
    super("div", "price");
    this._dualSlider = new DualSlider();
    this._minPrice = Math.min(...PRODUCTS.map((product) => product.price));
    this._maxPrice = Math.max(...PRODUCTS.map((product) => product.price));
  }
  createHeading() {
    const heading = document.createElement("h3");
    heading.classList.add("price__heading");
    heading.textContent = "Price";
    return heading;
  }

  draw() {
    this._element.appendChild(this.createHeading());
    this._element.appendChild(
      this._dualSlider.drawDualSlider(this._minPrice, this._maxPrice)
    );
    return this._element;
  }
}

class Filters extends Element {
  _categoryFilter: CategoryList;
  _brandsFilter: BrandList;
  _price: Price;
  constructor() {
    super("aside", "filters");
    this._categoryFilter = new CategoryList();
    this._brandsFilter = new BrandList();
    this._price = new Price();
  }
  draw() {
    this._element.appendChild(this._categoryFilter.draw());
    this._element.appendChild(this._brandsFilter.draw());
    this._element.appendChild(this._price.draw());
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
