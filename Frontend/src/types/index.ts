export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight: string;
  description: string;
  features: string[];
  certifications: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOrganic?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}