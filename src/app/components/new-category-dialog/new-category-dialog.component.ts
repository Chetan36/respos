import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/Category';
import {CONSUMABLE_CATEGORY, FOOD_CATEGORY, INGREDIENT_CATEGORY} from '../../Constants/InventoryConstants';
import {Tax} from '../../model/Tax';
import {TaxService} from '../../services/taxService/tax.service';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.css']
})
export class NewCategoryDialogComponent implements OnInit {

  category: Category;
  taxes: Tax[] = [];

  FOOD_CATEGORY: string = FOOD_CATEGORY;
  INGREDIENT_CATEGORY: string = INGREDIENT_CATEGORY;
  CONSUMABLE_CATEGORY: string = CONSUMABLE_CATEGORY;

  constructor(
    private taxService: TaxService,
  ) { }

  ngOnInit() {
    this.initCategory();
    this.getAllTaxes();
  }

  initCategory(): void  {
    this.category = {
      id: 0,
      name: '',
      description: '',
      abbreviation: '',
      tax: 0,
      masterCategory: ''
    };
  }

  getAllTaxes(): void  {
    this.taxService.getAllTaxes()
      .subscribe(
        response => {
          this.taxes = response;
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  syncAbbreviation(key: Event): void  {
    this.category.abbreviation = this.category.name.toUpperCase();
  }

}
