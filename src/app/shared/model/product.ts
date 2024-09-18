export interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  description: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
