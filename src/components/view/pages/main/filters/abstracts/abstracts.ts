import PRODUCTS from "../../../../../../products";
import { createCustomElement } from "../../../../../../assets/misc/func";

export abstract class BaseElement {
  _element: HTMLElement;
  constructor(tagName: string, className: string) {
    this._element = document.createElement(tagName);
    this._element.classList.add(className);
  }
}

export abstract class List extends BaseElement {
  protected _type: string;
  protected _className: string;
  protected _savedFilters: string[] = [];
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
      item.classList.add(`${this._type}-list__item`);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = key;
      input.classList.add(`${this._type}-list__input`);
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
      this.saveFilter(event);
    });
    return container;
  }

  resetStateToDefault() {
    document.querySelectorAll(`.${this._type}-list__input`).forEach((input) => {
      if (
        input instanceof HTMLInputElement &&
        input.parentElement &&
        input.parentElement.lastChild
      ) {
        if (input.checked) input.click();
        else {
          input.parentElement.classList.remove(
            `${this._type}-list__item--inactive`,
            `${this._type}-list__item--active`
          );
          const numberOfProducts = input.parentElement.lastChild.textContent;
          const totalNumberOfProducts = numberOfProducts
            ?.split("/")[1]
            .slice(0, -1);
          input.parentElement.lastChild.textContent = `(${totalNumberOfProducts}/${totalNumberOfProducts})`;
        }
      }
    });
  }

  public updateFilterView(event: MouseEvent) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.classList.value.includes(this._type)
    ) {
      const targetInputs = document.querySelectorAll(
        `.${this._type}-list__input`
      );
      const targetCheckedInputs = Array.from(targetInputs).filter((input) => {
        if (input instanceof HTMLInputElement) return input.checked === true;
      });
      // если все чекбоксы пустые снимаем все стили и выходим из функции
      if (targetCheckedInputs.length === 0) {
        targetInputs.forEach((input) => {
          if (input.parentElement && input.parentElement.lastChild) {
            input.parentElement.classList.remove(
              `${this._type}-list__item--inactive`,
              `${this._type}-list__item--active`
            );
            // и возвращаем стандартные значения
            const numberOfProducts = input.parentElement.lastChild.textContent;
            const totalNumberOfProducts = numberOfProducts
              ?.split("/")[1]
              .slice(0, -1);
            input.parentElement.lastChild.textContent = `(${totalNumberOfProducts}/${totalNumberOfProducts})`;
          }
        });
        this._savedFilters = [];
        return;
      }

      targetInputs.forEach((input) => {
        if (input instanceof HTMLInputElement && input.parentElement) {
          if (input.checked) {
            input.parentElement.classList.add(
              `${this._type}-list__item--active`
            );
            input.parentElement.classList.remove(
              `${this._type}-list__item--inactive`
            );
          } else {
            input.parentElement.classList.add(
              `${this._type}-list__item--inactive`
            );
            input.parentElement.classList.remove(
              `${this._type}-list__item--active`
            );
          }
        }
      });
    }
  }

  saveFilter(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      this._savedFilters = [];
      document
        .querySelectorAll(`.${this._type}-list__input`)
        .forEach((input) => {
          if (input instanceof HTMLInputElement && input.checked)
            this._savedFilters.push(input.value.toLocaleLowerCase());
        });
    }
  }

  get savedFilters() {
    return this._savedFilters;
  }

  draw() {
    this._element.appendChild(this.createHeading());
    this._element.appendChild(this.createItems());
    return this._element;
  }
}

export class DualSlider {
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
      if (Number(currentTarget.value) <= 10) {
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
