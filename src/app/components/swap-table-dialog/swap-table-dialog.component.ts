import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-swap-table-dialog',
  templateUrl: './swap-table-dialog.component.html',
  styleUrls: ['./swap-table-dialog.component.css']
})
export class SwapTableDialogComponent implements OnInit {

  fromTable: number;
  toTable: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.fromTable = this.data.fromTable;
    this.toTable = null;
  }

  clickSubmit(): void {
    document.getElementById('submitBtn').click();
  }

}
