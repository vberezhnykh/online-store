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
    [key: string]: number;
  };
  stock: object;
}
