import {Order} from './Order';
import {RestaurantTable} from './RestaurantTable';

export interface OrderStart {
  order: Order;
  table: RestaurantTable;
}
