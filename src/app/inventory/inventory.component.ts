import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {Product} from '../model/Product';
import {Category} from '../model/Category';
import {NewCategoryDialogComponent} from '../components/new-category-dialog/new-category-dialog.component';
import {NewProductDialogComponent} from '../components/new-product-dialog/new-product-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  searchTextProduct: string;
  searchTextCategory: string;

  noCategory: boolean;
  noProduct: boolean;

  categories: Category[] = [];
  products: Product[] = [];
  tempProducts: Product[] = [];

  product: Product;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.initProduct();
    this.noCategory = true;
    this.noProduct = true;
    this.getAllCategories();
    this.getAllProducts();
  }

  initProduct(): void {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      categoryAbbreviation: '',
      masterCategoryAbbreviation: '',
      tax: 0,
      stockQty: 0,
      unitAbbreviation: '',
      extra: false,
      hasRecipe: false,
      available: false
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

  actionClicked(): void  {
    this.router.navigate(['/stock']);
  }

  getAllCategories(): void  {
    this.inventoryService.getAllCategories()
      .subscribe(
        response => {
          this.noCategory = false;
          this.categories = response;
          console.log(this.categories);
        },
        error1 => {
          this.noCategory = false;
          console.error(error1.status);
        }
      );
  }

  getAllProducts(): void  {
    this.inventoryService.getAllProducts()
      .subscribe(
        response => {
          this.noProduct = false;
          this.products = response;
          this.tempProducts = response;
          console.log(this.products);
        },
        error1 => {
          this.noProduct = false;
          console.error(error1.status);
        }
      );
  }

  categoryFilter(category: string): void  {
    this.noProduct = true;
    this.tempProducts = [];
    this.products.map(x => {
      if (x.categoryAbbreviation === category)  {
        this.tempProducts.push(x);
      }
    });
    this.noProduct = false;
  }

  allCategoryClicked(): void  {
    this.tempProducts = this.products;
  }

  newCategoryClicked(): void  {
    this.toggleNewCategory();
  }

  toggleNewCategory() {
    const dialogRef = this.dialog.open(NewCategoryDialogComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.addNewCategory(result)
          .subscribe(
            response => {
              this.openSuccessSnackBar('Category added successfully', 'Close');
              this.categories.push(response);
            },
            error1 => {
              this.openErrorSnackBar(error1.error.message, 'Close');
            });
      }
    });
  }

  productClicked(product: Product): void  {
    this.product = product;
    this.toggleProduct();
  }

  toggleProduct() {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      width: '550px',
      data: { product: this.product, categories: this.categories }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.inventoryService.updateProduct(result)
          .subscribe(
            response => {
              this.openSuccessSnackBar('Product updated successfully', 'Close');
              console.log(response);
              console.log(this.products.indexOf(this.product), '  ', this.tempProducts.indexOf(this.product));
              this.initProduct();
            },
            error1 => {
              console.error(error1);
              this.openErrorSnackBar(error1.error.message, 'Close');
            }
          );
      }
    });
  }

}
