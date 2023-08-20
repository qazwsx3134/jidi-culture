import type { SEO } from "./seo";
import type { Timestamp } from "./timestamp";

export interface HomePageAttributes {
  shopText: string;
  seo: SEO | null;
}

export interface HomePage {
  id: string;
  attributes: HomePageAttributes & Timestamp;
}
