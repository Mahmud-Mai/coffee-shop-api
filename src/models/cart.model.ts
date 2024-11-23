export interface CartItem {
  name: string;
  price: number;
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}
