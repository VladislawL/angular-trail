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

export interface FilterParams {
  query: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  stock: boolean | undefined;
  rating: number | undefined;
  reviews: boolean | undefined;
}
