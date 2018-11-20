import { Component, OnInit } from '@angular/core';
import {RestaurantTable} from '../model/RestaurantTable';
import {MasterDataService} from '../services/masterDataService/master-data.service';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {

  restaurantTables: RestaurantTable[];
  activeTable: RestaurantTable;

  constructor(
    private masterDataService: MasterDataService
  ) { }

  ngOnInit() {
    this.getRestaurantTables();
    this.initActiveTable();
  }

  initActiveTable(): void {
    this.activeTable = {
      id: null,
      tableNumber: null,
      running: false,
      orderId: null
    };
  }

  getRestaurantTables(): void {
    this.masterDataService.getRestaurantTables()
      .subscribe(
        response => {
          this.restaurantTables = response;
          console.log(this.restaurantTables);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  activateTable(table: RestaurantTable): void {
    this.activeTable = table;
    if (table.running)  {
      console.log('This table is running');
    }
  }

}
