export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: {
    url?: string;
    width?: number;
    height?: number;
  };
}
