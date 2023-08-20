import type { Image } from "./image";

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: string;
  canonicalURL?: string;
  metaSocial?: MetaSocial[];
}

export interface MetaSocial {
  socialNetwork: string;
  title: string;
  description: string;
  image: {
    data: Image | null;
  };
}
