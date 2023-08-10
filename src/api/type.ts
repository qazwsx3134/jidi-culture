export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

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
}

export interface timestamp {
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  attributes: ImageAttributes & timestamp;
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

export interface Product {
  id: string;
  attributes: ProductAttributes & timestamp;
}

export interface ProductsAPI {
  data: Product[];
  meta: {
    pagination: Pagination;
  };
}

export interface ProductAPI {
  data: Product | null;
  meta: {};
}
