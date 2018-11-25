import { Component, OnInit } from '@angular/core';
import {Product} from '../model/Product';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {Recipe} from '../model/Recipe';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
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

  selectedType: string;

  recipe: Recipe;
  recipeItems: Recipe[];
  recipeItemDataSource: MatTableDataSource<Recipe>;
  displayedColumns: string[];
  recipeProducts: Product[];

  noItem: boolean;
  searchText: string;

  constructor(
    private snackBar: MatSnackBar,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.noItem = true;
    this.recipeItems = [];
    this.recipeProducts = [];
    this.recipeItemDataSource = new MatTableDataSource(this.recipeItems);
    this.initProduct();
    this.initRecipe();
    this.getProducts();
    this.getCategories();
    this.selectedType = 'INGREDIENT';
    this.getRecipeProducts();
    this.displayedColumns = ['type', 'item', 'quantity', 'action'];
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

  getRecipeProducts(): void {
    this.recipeProducts = [];
    if (this.selectedType === 'INGREDIENT') {
      this.getIngredientProducts();
    } else if (this.selectedType === 'CONSUMABLE')  {
      this.getConsumableProducts();
    } else if (this.selectedType === 'EXTRA')  {
      this.getExtraProducts();
    }
  }

  setRecipeAppropriates(name: string): void {
    const item: Product = this.recipeProducts.find(x => x.name === name.toUpperCase());
    this.recipe.itemId = item.id;
    this.recipe.unitAbbreviation = item.unitAbbreviation;
    this.recipe.price = item.price;
    this.recipe.masterCategory = item.masterCategoryAbbreviation;
    this.recipe.tax = item.tax;
    if (this.selectedType === 'EXTRA')  {
      this.recipe.extra = true;
    } else  {
      this.recipe.extra = false;
    }
    document.getElementById('qty').focus();
  }

  getIngredientProducts(): void {
    this.inventoryService.getIngredientProducts()
      .subscribe(
        response => {
          this.recipeProducts = response;
          console.log(this.recipeProducts);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  getConsumableProducts(): void {
    this.inventoryService.getConsumableProducts()
      .subscribe(
        response => {
          this.recipeProducts = response;
          console.log(this.recipeProducts);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  getExtraProducts(): void {
    this.inventoryService.getAllExtraProducts()
      .subscribe(
        response => {
          this.recipeProducts = response;
          console.log(this.recipeProducts);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  getCompleteRecipe(productId: number)  {
    this.inventoryService.getRecipeByProductId(productId)
      .subscribe(
        response => {
          this.recipeItems = response;
          this.recipeItemDataSource = new MatTableDataSource<Recipe>(this.recipeItems);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  activateRecipe(product: Product): void {
    this.recipeItems = [];
    this.product = product;
    this.recipe.product = this.product;
    this.getCompleteRecipe(this.product.id);
  }

  addRecipe(): void {
    this.recipe.price = this.recipe.price * this.recipe.qty;
    this.inventoryService.addRecipe(this.recipe)
      .subscribe(
        response => {
          this.recipeItems.push(response);
          this.recipeItemDataSource = new MatTableDataSource<Recipe>(this.recipeItems);
          this.initRecipe();
          this.recipe.product = this.product;
          this.openSuccessSnackBar('Item added to recipe', 'Close');
          document.getElementById('rcpType').focus();
          console.log(response);
        },
        error1 => {
          console.error(error1);
          this.openSuccessSnackBar('Could not add item to recipe', 'Close');
        }
      );
  }

}
