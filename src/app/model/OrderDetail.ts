import {Order} from './Order';

export class OrderDetail {
  id: number;
  productName: string;
  qty: number;
  unit: string;
  itemPrice: number;
  basePrice: number;
  tax: number;
  totalPrice: number;
  order: Order;
}
