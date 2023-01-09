export interface ICustomElement {
  selector: string;
  class: string;
  options?: IImgOptions;
}
interface IImgOptions {
  src: string;
  alt: string;
}
export interface IProductInfo {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export enum CardDetailsOrder {
  category,
  brand,
  price,
  discountPercentage,
  rating,
  stock,
}

export enum DetailsOrder {
  description,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
}
export enum CardSort {
  Sort_options,
  Sort_by_Price_ASC,
  Sort_by_Price_DESC,
  Sort_by_Rating_ASC,
  Sort_by_Rating_DESC,
  Sort_by_Discount_ASC,
  Sort_by_Discount_DESC,
}
export interface ISortObj {
  order: number;
  amount: number;
}

export enum CartText {
  title = "Products in Cart",
  titleItemLimit = "Items: ",
  titlePageAmount = "Page: ",
  summary = "Summary",
  summaryProduct = "Products: ",
  summaryTotal = "Total: ",
  summaryPromoTest = "Promo for test: ",
  promoTestCodes = `'RS', 'EPM'`,
}

export enum CartDefaultTitle {
  items = 3,
  pages = 1,
  amount = 1,
}
export interface AppliedFilters {
  category?: string[];
  brand?: string[];
  price?: {
    min?: number;
    max?: number;
  };
  stock?: {
    min?: number;
    max?: number;
  };
}

export interface Options {
  category: {
    [key: string]: number;
  };
  brand: {
    [key: string]: number;
  };
  price: {
    min?: number;
    max?: number;
  };
  stock: {
    min?: number;
    max?: number;
  };
}
export enum DetailsNav {
  category,
  brand,
  title,
}

export type ValidationFunc = (input: HTMLInputElement) => void;

interface InputAttributes {
  type: string;
  placeholder: string;
  min?: string;
}

export interface PersonalDetailsInputs {
  name: InputAttributes;
  number: InputAttributes;
  address: InputAttributes;
  email: InputAttributes;
}

export interface IPersonalDetails {
  _isValidName: boolean;
  _isValidPhoneNumber: boolean;
  _isValidAddress: boolean;
  _isValidEmail: boolean;
  _isValid: boolean;
  toggleErrorMessage(
    input: HTMLInputElement,
    className: string,
    isValid: boolean
  ): void;
  createInput(
    className: string,
    placeholder: string,
    type: string
  ): HTMLElement;
  createPersonalDetails(): HTMLElement;
  validateName(input: HTMLInputElement): void;
  validatePhoneNumber(input: HTMLInputElement): void;
  validateAddress(input: HTMLInputElement): void;
  validateEmail(input: HTMLInputElement): void;
  validatePersonalDetails(): void;
}

export interface ICardDetails {
  _isValidCardNumber: boolean;
  _isValidDate: boolean;
  _isValidCvv: boolean;
  _isValid: boolean;
  createCardDetails(): HTMLElement;
  toggleErrorMessage(className: string, isValid: boolean): void;
  validateCardNumber(input: HTMLInputElement): void;
  validateExpireDate(input: HTMLInputElement, event: KeyboardEvent): void;
  validateCvv(input: HTMLInputElement): void;
  validateCardDetails(): void;
}

export interface IModal {
  _personalDetails: IPersonalDetails;
  _cardDetails: ICardDetails;
  createConfirmButton(): HTMLButtonElement;
  checkValidity(): void;
  draw(): void;
  closeModal(event: Event): void;
}
