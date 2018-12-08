import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Order} from '../../model/Order';

@Component({
  selector: 'app-close-order-dialog',
  templateUrl: './close-order-dialog.component.html',
  styleUrls: ['./close-order-dialog.component.css']
})
export class CloseOrderDialogComponent implements OnInit {

  order: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.order = this.data.order;
  }

}
