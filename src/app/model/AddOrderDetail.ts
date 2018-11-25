import {OrderDetail} from './OrderDetail';
import {ExtraItem} from './ExtraItem';

export interface AddOrderDetail {
  orderDetail: OrderDetail;
  extraItems: ExtraItem[];
}
