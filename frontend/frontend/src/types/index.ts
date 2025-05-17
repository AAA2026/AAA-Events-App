export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  userId: number;
  eventId: number;
  numberOfTickets: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  event?: Event;
  user?: User;
} 