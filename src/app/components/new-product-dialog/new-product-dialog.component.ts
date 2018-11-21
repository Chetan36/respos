import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Product} from '../../model/Product';
import {Category} from '../../model/Category';
import {CONSUMABLE_CATEGORY, FOOD_CATEGORY, INGREDIENT_CATEGORY} from '../../Constants/InventoryConstants';
import {MasterDataService} from '../../services/masterDataService/master-data.service';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent implements OnInit {

  dialogTitle: string;
  product: Product;
  categories: Category[];
  tempCategories: Category[];
  unitAbbreviations: string[];

  FOOD_CATEGORY: string = FOOD_CATEGORY;
  INGREDIENT_CATEGORY: string = INGREDIENT_CATEGORY;
  CONSUMABLE_CATEGORY: string = CONSUMABLE_CATEGORY;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterDataService: MasterDataService
  ) { }

  ngOnInit() {
    this.dialogTitle = 'New Item';
    this.getAllUnits();
    if (this.data.product.name !== '') {
      this.dialogTitle = this.data.product.name;
    }
    this.product = this.data.product;
    this.categories = this.data.categories;

    this.tempCategories = [];
    this.categories.map(x => {
      if (x.masterCategory === this.product.masterCategoryAbbreviation) {
        this.tempCategories.push(x);
      }
    });

    console.log(this.tempCategories);
  }

  getAllUnits(): void {
    this.masterDataService.getAllUnitAbbreviations()
      .subscribe(
        response => {
          this.unitAbbreviations = response;
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  onChangeMasterCategory(): void  {
    this.tempCategories = [];
    this.categories.map(x => {
      if (x.masterCategory === this.product.masterCategoryAbbreviation) {
        this.tempCategories.push(x);
      }
    });
  }

  onChangeCategory(): void  {
    this.product.tax = this.categories.find(x => x.abbreviation === this.product.categoryAbbreviation).tax;
  }

}
