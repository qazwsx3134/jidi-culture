import type { SEO } from "./seo";
import type { Timestamp } from "./timestamp";

export interface Block {
  title: string;
  number: number;
  description: string;
}

export interface ShopPageAttributes {
  title: string;
  shopDescription: string;
  firstBlock: Block;
  secondBlock: Block;
  thirdBlock: Block;
  seo: SEO | null;
}

export interface ShopPage {
  id: string;
  attributes: ShopPageAttributes & Timestamp;
}
