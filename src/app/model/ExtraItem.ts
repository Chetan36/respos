import {OrderDetail} from './OrderDetail';

export class ExtraItem {
  id: number;
  name: string;
  itemPrice: number;
  basePrice: number;
  totalPrice: number;
  tax: number;
  qty: number;
  orderDetail: OrderDetail;
}
