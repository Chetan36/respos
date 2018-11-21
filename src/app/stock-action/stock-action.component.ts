import { Component, OnInit } from '@angular/core';
import {STOCK_DUMP, STOCK_RECEIVE, STOCK_TRANSFER_IN, STOCK_TRANSFER_OUT} from '../Constants/InventoryConstants';

@Component({
  selector: 'app-stock-action',
  templateUrl: './stock-action.component.html',
  styleUrls: ['./stock-action.component.css']
})
export class StockActionComponent implements OnInit {

  STOCK_RECEIVE: number = STOCK_RECEIVE;
  STOCK_TRANSFER_IN: number = STOCK_TRANSFER_IN;
  STOCK_TRANSFER_OUT: number = STOCK_TRANSFER_OUT;
  STOCK_DUMP: number = STOCK_DUMP;

  stockActivity: number;

  constructor() { }

  ngOnInit() {
    this.stockActivity = null;
  }

  activateStockActivity(activity: number): void {
    this.stockActivity = activity;
  }

}
