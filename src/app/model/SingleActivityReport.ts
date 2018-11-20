import {RestaurantDetails} from './RestaurantDetails';
import {SingleItemReport} from './SingleItemReport';

export class SingleActivityReport {
  fromDate: string;
  toDate: string;
  activity: number;
  reportType: string;
  restaurantDetails: RestaurantDetails;
  singleItemReportList: SingleItemReport[];
}
