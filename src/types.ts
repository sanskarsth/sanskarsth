export interface Destination {
  id: string;
  title: string;
  region: string;
  description: string;
  longDescription: string;
  image: string;
  highlights: string[];
  altitude?: string;
  duration: string;
  bestSeason: string;
  category: 'adventure' | 'luxury' | 'culture';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string; // name of Lucide icon
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  text: string;
  tripTaken: string;
  rating: number; // usually 5
}

export interface Inquiry {
  name: string;
  email: string;
  whatsapp?: string;
  destination: string;
  travelDate: string;
  pax: number;
  message: string;
}
