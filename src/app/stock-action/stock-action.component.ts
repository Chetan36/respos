import { Component, OnInit } from '@angular/core';
import {STOCK_DUMP, STOCK_RECEIVE, STOCK_TRANSFER_IN, STOCK_TRANSFER_OUT} from '../Constants/InventoryConstants';
import {InventoryTransaction} from '../model/InventoryTransaction';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Product} from '../model/Product';
import {Router} from '@angular/router';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {NewProductDialogComponent} from '../components/new-product-dialog/new-product-dialog.component';
import {Category} from '../model/Category';
import {Vendor} from '../model/Vendor';

@Component({
  selector: 'app-stock-action',
  templateUrl: './stock-action.component.html',
  styleUrls: ['./stock-action.component.css']
})
export class StockActionComponent implements OnInit {

  STOCK_RECEIVE: number = STOCK_RECEIVE;
  STOCK_TRANSFER_IN: number = STOCK_TRANSFER_IN;
  STOCK_TRANSFER_OUT: number = STOCK_TRANSFER_OUT;
  STOCK_DUMP: number = STOCK_DUMP;

  stockActivity: number;

  product: Product;
  products: Product[];
  categories: Category[];
  vendors: Vendor[];

  inventoryTransaction: InventoryTransaction;
  inventoryTransactions: InventoryTransaction[];
  inventoryTransactionDataSource: MatTableDataSource<InventoryTransaction>;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.stockActivity = null;
    this.inventoryTransactions = [];
    this.products = [];
    this.categories = [];
    this.vendors = [];
    this.inventoryTransactionDataSource = null;
    this.initProduct();
    this.initInventoryTransaction();
    this.getAllProducts();
    this.getAllCategories();
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

  initInventoryTransaction(): void {
    this.inventoryTransaction = {
      id: 0,
      productId: 0,
      productName: '',
      activityCode: 0,
      qty: 0,
      numberOfTransactions: 0,
      partyName: '',
      gstinNumber: '',
      price: 0,
      reason: ''
    };
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

  setInventoryTransaction(product: Product) {
    this.product = product;
    this.inventoryTransaction.productId = product.id;
    this.inventoryTransaction.activityCode = this.stockActivity;
    this.inventoryTransaction.productName = product.name;
    this.inventoryTransaction.price = product.price;
    this.inventoryTransaction.numberOfTransactions = 1;
  }

  getAllProducts(): void  {
    console.log('Fetching products');
    this.inventoryService.getAllProducts()
      .subscribe(
        response => {
          this.products = response;
        },
        error1 => {
          console.error(error1.status);
        }
      );
  }

  getProductByName(productName: string): void  {
    this.initProduct();
    this.inventoryService.getProductByName(productName)
      .subscribe(
        response => {
          this.setInventoryTransaction(response);
          document.getElementById('price').focus();
        },
        error1 => {
          this.product.name = productName;
          this.toggleProduct();
        }
      );
  }

  getAllCategories(): void  {
    console.log('Fetching categories');
    this.inventoryService.getAllNonFoodCategories()
      .subscribe(
        response => {
          this.categories = response;
          console.log(this.categories);
        },
        error1 => {
          console.error(error1.status);
        }
      );
  }

  getPartyNames(): void {
    if (this.stockActivity === this.STOCK_RECEIVE) {
      this.inventoryService.getAllVendors()
        .subscribe(
          response => {
            this.vendors = response;
            console.log(this.vendors);
          },
          error1 => {
            console.error(error1);
          }
        );
    } else if (this.stockActivity === this.STOCK_TRANSFER_IN || this.stockActivity === this.STOCK_TRANSFER_IN) {
      this.inventoryService.getAllPartners()
        .subscribe(
          response => {
            this.vendors = response;
          },
          error1 => {
            console.error(error1);
          }
        );
    }
  }

  toggleProduct() {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      width: '550px',
      data: { product: this.product, categories: this.categories }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.inventoryService.addNewProduct(result)
          .subscribe(
            response => {
              this.openSuccessSnackBar('Product added successfully', 'Close');
              this.setInventoryTransaction(response);
              this.products.push(response);
              document.getElementById('qty').focus();
            },
            error1 => {
              console.error(error1);
              this.openErrorSnackBar(error1.error.message, 'Close');
            }
          );
      }
    });
  }

  priceEntered(): void  {
    document.getElementById('qty').focus();
  }

  qtyEntered(): void  {
    document.getElementById('partyName').focus();
  }

  vendorEntered(): void  {
    document.getElementById('gstinNumber').focus();
  }

  activateStockActivity(activity: number): void {
    this.stockActivity = activity;
    this.getPartyNames();
  }

}
