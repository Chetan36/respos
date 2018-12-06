import { Component, OnInit } from '@angular/core';
import {ExtraItem} from '../../model/ExtraItem';

@Component({
  selector: 'app-extra-item-dialog',
  templateUrl: './extra-item-dialog.component.html',
  styleUrls: ['./extra-item-dialog.component.css']
})
export class ExtraItemDialogComponent implements OnInit {

  extraItemsSelected: ExtraItem[];
  extraItem: ExtraItem;

  constructor() { }

  ngOnInit() {
    this.extraItemsSelected = [];
    this.initExtraItem();
  }

  initExtraItem(): void {
    this.extraItem = {
      id: null,
      orderDetail: null,
      totalPrice: 0,
      basePrice: 0,
      name: '',
      itemPrice: 0,
      tax: 0,
      qty: 0
    };
  }

}
