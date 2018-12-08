import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-settle-order-dialog',
  templateUrl: './settle-order-dialog.component.html',
  styleUrls: ['./settle-order-dialog.component.css']
})
export class SettleOrderDialogComponent implements OnInit {

  netAmount: number;
  amountPaid: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.netAmount = this.data.netAmount;
    this.amountPaid = null;
  }

  clickSubmit(): void {
    document.getElementById('submitBtn').click();
  }

}
