import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-print-kot-dialog',
  templateUrl: './print-kot-dialog.component.html',
  styleUrls: ['./print-kot-dialog.component.css']
})
export class PrintKotDialogComponent implements OnInit {

  order: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.order = this.data.order;
  }

  clickSubmit(): void {
    document.getElementById('submitBtn').click();
  }

}
