import { Component, OnInit } from '@angular/core';
import {Product} from '../model/Product';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {Recipe} from '../model/Recipe';
import {MatSnackBar} from '@angular/material';
import {Category} from '../model/Category';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  product: Product;

  recipe: Recipe;

  noItem: boolean;
  searchText: string;

  constructor(
    private snackBar: MatSnackBar,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.noItem = true;
    this.initProduct();
    this.initRecipe();
    this.getProducts();
    this.getCategories();
  }

  initProduct(): void {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      masterCategoryAbbreviation: '',
      categoryAbbreviation: '',
      tax: 0,
      stockQty: 0,
      unitAbbreviation: '',
      extra: false,
      hasRecipe: false,
      available: false
    };
  }

  initRecipe(): void  {
    this.recipe = {
      id: null,
      itemId: 0,
      name: '',
      masterCategory: '',
      qty: 0,
      unitAbbreviation: '',
      available: null,
      extra: null,
      tax: 0,
      price: 0,
      product: null,
      checked: false
    };
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  openSuccessSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getProducts(): void  {
    this.inventoryService.getRecipeProducts()
      .subscribe(
        response => {
          this.products = response;
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  getCategories(): void  {
    this.inventoryService.getFoodCategories()
      .subscribe(
        response => {
          this.noItem = false;
          this.categories = response;
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  activateRecipe(product: Product): void {
    this.product = product;
  }

}
