export interface ICustomElement {
  selector: string;
  class: string;
  options?: IImgOptions;
}
interface IImgOptions {
  src : string; 
  alt : string;
}
export interface IProductInfo {
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
  stock
}

export enum CardSort {
  Sort_options,
  Sort_by_price_ASC,
  Sort_by_price_DESC,
  Sort_by_rating_ASC,
  Sort_by_rating_DESC,
  Sort_by_discount_ASC,
  Sort_by_discount_DESC
}