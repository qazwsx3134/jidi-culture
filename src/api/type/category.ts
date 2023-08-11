import { Timestamp } from "./timestamp";

export interface Category {
  id: "string";
  attributes: CategoryAttributes & Timestamp;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
}
