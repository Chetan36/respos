import {RestaurantDetails} from './RestaurantDetails';
import {SalesReportItem} from './SalesReportItem';

export class SalesReport {
  fromDate: string;
  toDate: string;
  restaurantDetails: RestaurantDetails;
  salesReportItems: SalesReportItem[];
  totalAmt: number;
  totalAmtCollected: number;
  totalDiscount: number;
  cashPaid: number;
  cardPaid: number;
  otherPaid: number;
}
