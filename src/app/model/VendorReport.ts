import {SingleItemReport} from './SingleItemReport';
import {RestaurantDetails} from './RestaurantDetails';

export class VendorReport {
  toDate: string;
  fromDate: string;
  vendor: string;
  gstinNumber: string;
  totalPrice: number;
  totalGst: number;
  itemReports: SingleItemReport[];
  restaurantDetails: RestaurantDetails;
}
