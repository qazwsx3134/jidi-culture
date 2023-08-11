import type { Timestamp } from "./timestamp";

export interface Image {
  id: number;
  attributes: ImageAttributes & Timestamp;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface ImageAttributes extends ImageFormat {
  name: string;
  alternativeText?: string;
  caption?: string;
  hash: string;

  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}
