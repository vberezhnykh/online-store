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
