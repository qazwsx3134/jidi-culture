import type { Category } from "./category";
import type { Image } from "./image";
import type { SEO } from "./seo";
import type { Timestamp } from "./timestamp";

export interface ProductAttributes {
  tag: string;
  slug: string;
  name: string;
  price: number;
  availableQuantity: number;
  description?: string;
  backOrder?: boolean;
  detail?: string;
  image?: {
    data: Image;
  };
  images?: {
    data?: Image[];
  };
  categories?: {
    data?: Category[];
  };
  seo: SEO | null;
}

export interface Product {
  id: string;
  attributes: ProductAttributes & Timestamp;
}
