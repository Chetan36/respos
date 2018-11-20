import {AllInventoryActivities} from './AllInventoryActivities';
import {RestaurantDetails} from './RestaurantDetails';

export class AllActivitiesReport {
  fromDate: Date;
  toDate: Date;
  allInventoryActivitiesByProduct: AllInventoryActivities;
  restaurantDetails: RestaurantDetails;
}
