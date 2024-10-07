export interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  description: string;
  image: string;
  rating: Rating | undefined;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface FilterParams {
  query: string;
  minPrice: string;
  maxPrice: string;
  stock: string;
  rating: string;
  reviews: string;
}
