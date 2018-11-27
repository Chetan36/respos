import { Component, OnInit } from '@angular/core';
import {RestaurantTable} from '../model/RestaurantTable';
import {MasterDataService} from '../services/masterDataService/master-data.service';
import {OrderService} from '../services/orderService/order.service';
import {Order} from '../model/Order';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Product} from '../model/Product';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {SwapTableDialogComponent} from '../components/swap-table-dialog/swap-table-dialog.component';
import {OrderDetail} from '../model/OrderDetail';
import {ExtraItem} from '../model/ExtraItem';
import {AddOrderDetail} from '../model/AddOrderDetail';
import {Recipe} from '../model/Recipe';
import {RestaurantService} from '../services/restaurantService/restaurant.service';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {

  products: Product[];

  restaurantTables: RestaurantTable[];
  activeTable: RestaurantTable;
  activeOrder: Order;
  orderDetail: OrderDetail;
  orderDetails: OrderDetail[];
  extraRecipeItems: Recipe[];
  addOrderDetail: AddOrderDetail;

  constructor(
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.products = [];
    this.getRestaurantTables();
    this.getProducts();
    this.initActiveTable();
    // this.initOrderDetail();
    this.initAddOrderDetail();
    this.extraRecipeItems = [];
    this.orderDetails = [];
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

  initAddOrderDetail(): void {
    this.addOrderDetail = {
      orderDetail: {
        id: null,
        productName: '',
        basePrice: 0,
        itemPrice: 0,
        qty: 0,
        tax: 0,
        totalPrice: 0,
        unit: '',
        order: null
      },
      extraItems: []
    };
  }

  initActiveTable(): void {
    this.activeTable = {
      id: null,
      tableNumber: null,
      running: false,
      orderId: null
    };
  }

  getRestaurantTables(): void {
    this.restaurantService.getRestaurantTables()
      .subscribe(
        response => {
          this.restaurantTables = response;
          // console.log(this.restaurantTables);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  getProducts(): void  {
    this.inventoryService.getRecipeProducts()
      .subscribe(
        response => {
          this.products = response;
          // console.log(this.products);
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  startOrder(): void  {
    this.restaurantService.startOrder(this.activeTable.tableNumber)
      .subscribe(
        response => {
          this.activeTable = response.table;
          this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === response.table.tableNumber)] = response.table;
          this.activeOrder = response.order;
          this.openSuccessSnackBar('Order started', 'Close');
          // console.log(response);
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  cancelOrder(): void {
    this.restaurantService.cancelOrder(this.activeTable.tableNumber)
      .subscribe(
        response => {
          this.activeTable = response;
          this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === response.tableNumber)] = response;
          this.initAddOrderDetail();
          this.openSuccessSnackBar('Order cancelled successfully', 'Close');
        },
        error1 => {
          this.openErrorSnackBar('Could not cancel the order', 'Close');
        }
      );
  }

  swapTableClicked(): void  {
    this.toggleSwapTableDialog();
  }

  toggleSwapTableDialog() {
    const dialogRef = this.dialog.open(SwapTableDialogComponent, {
      width: '550px',
      data: { fromTable: this.activeTable.tableNumber }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.swapOrderTable(this.activeTable.tableNumber, result);
      }
    });
  }

  swapOrderTable(fromTable: number, toTable: number): void  {
    if (fromTable === toTable)  {
      this.openErrorSnackBar('Cannot swap between same tables', 'Close');
      return;
    }
    this.restaurantService.swapTable(fromTable, toTable)
      .subscribe(
        response => {
          this.activeTable = response;
          this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === fromTable)].orderId = null;
          this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === fromTable)].running = false;
          this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === response.tableNumber)] = response;
          this.openSuccessSnackBar('Table swapped successfully', 'Close');
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  activateTable(table: RestaurantTable): void {
    this.initAddOrderDetail();
    this.activeTable = table;
    if (table.running)  {
      this.orderService.getOrderById(table.orderId)
        .subscribe(
          response => {
            this.activeOrder = response;
            this.fetchOrderDetails(this.activeOrder.id);
          },
          error1 => {
            this.openErrorSnackBar(error1.error.message, 'Close');
          }
        );
    }
  }

  fetchOrderDetails(id: number): void {
    this.orderService.getOrderDetailsById(id)
      .subscribe(
        response => {
          this.orderDetails = response;
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  setOrderDetail(productName: string): void  {
    this.addOrderDetail.extraItems = [];
    const product = this.products[this.products.findIndex(x => x.name === productName)];
    this.addOrderDetail.orderDetail.order = this.activeOrder;
    this.addOrderDetail.orderDetail.unit = product.unitAbbreviation;
    this.addOrderDetail.orderDetail.qty = 1;
    this.addOrderDetail.orderDetail.itemPrice = product.price;
    this.addOrderDetail.orderDetail.totalPrice = product.price;
    this.addOrderDetail.orderDetail.tax = product.tax;
    // console.log(this.orderDetail);
    this.getExtraItems(product);
    document.getElementById('odQty').focus();
  }

  getExtraItems(product: Product): void {
    this.inventoryService.getExtraRecipeByProductId(product.id)
      .subscribe(
        response => {
          this.extraRecipeItems = response;
          this.extraRecipeItems.forEach(item => {
            const extraItem: ExtraItem = {
              id: item.itemId,
              name: item.name,
              qty: 0,
              itemPrice: item.price,
              tax: item.tax,
              checked: false,
              available: item.available
            };
            this.addOrderDetail.extraItems.push(extraItem);
          });
        },
        error1 => {
          console.error(error1);
        }
      );
  }

}

