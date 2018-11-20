import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }

  ngOnInit() {
    console.log(this.product);
  }

}
