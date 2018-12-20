import { Component, OnInit } from '@angular/core';
import {RestaurantTable} from '../model/RestaurantTable';
import {OrderService} from '../services/orderService/order.service';
import {Order} from '../model/Order';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Product} from '../model/Product';
import {InventoryService} from '../services/inventoryService/inventory.service';
import {SwapTableDialogComponent} from '../components/swap-table-dialog/swap-table-dialog.component';
import {OrderDetail} from '../model/OrderDetail';
import {ExtraItem} from '../model/ExtraItem';
import {AddOrderDetail} from '../model/AddOrderDetail';
import {Recipe} from '../model/Recipe';
import {RestaurantService} from '../services/restaurantService/restaurant.service';
import { PrintKotDialogComponent } from '../components/print-kot-dialog/print-kot-dialog.component';
import {OrderDetailsDialogComponent} from '../components/order-details-dialog/order-details-dialog.component';
import {SettleOrderDialogComponent} from '../components/settle-order-dialog/settle-order-dialog.component';
import {CloseOrderDialogComponent} from '../components/close-order-dialog/close-order-dialog.component';
import {ORDER_SETTLED} from '../Constants/OrderConstants';

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
  orderDetails: AddOrderDetail[];
  currentOrderDetails: AddOrderDetail[];
  orderDetailDataSource: MatTableDataSource<AddOrderDetail>;
  displayedColumns: String[] = ['itemName', 'qty', 'price', 'extra', 'action'];
  extraRecipeItems: Recipe[];
  extraItems: ExtraItem[];
  addOrderDetail: AddOrderDetail;
  submitOrderDetailProcessing: boolean;

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
    this.extraItems = [];
    this.orderDetails = [];
    this.currentOrderDetails = [];
    this.orderDetailDataSource = new MatTableDataSource<AddOrderDetail>(this.orderDetails);
    this.submitOrderDetailProcessing = false;
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
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
        category: '',
        order: null,
        complementary: false
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
          this.openErrorSnackBar(error1.error.message, 'Close');
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
          this.currentOrderDetails = [];
          this.orderDetailDataSource = new MatTableDataSource<AddOrderDetail>(this.orderDetails);
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
    this.addOrderDetail.orderDetail.category = product.categoryAbbreviation;
    this.addOrderDetail.orderDetail.tax = product.tax;
    this.addOrderDetail.orderDetail.complementary = false;
    // console.log(this.orderDetail);
    this.getExtraItems(product);
  }

  resetOrderDetail(): void  {
    this.initAddOrderDetail();
    this.extraRecipeItems = [];
    this.extraItems = [];
  }

  updatePrice(): void {
    this.addOrderDetail.orderDetail.totalPrice = this.addOrderDetail.orderDetail.qty * this.addOrderDetail.orderDetail.itemPrice;
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
              qty: item.qty,
              itemPrice: item.price,
              tax: item.tax,
              basePrice: 0,
              totalPrice: item.price,
              orderDetail: this.addOrderDetail.orderDetail
            };
            this.extraItems.push(extraItem);
          });
        },
        error1 => {
          console.error(error1);
        }
      );
  }

  submitOrderDetail(): void {
    this.submitOrderDetailProcessing = true;
    console.log(this.addOrderDetail);
    this.orderService.saveOrderDetail(this.addOrderDetail)
      .subscribe(
        response => {
          console.log(response);
          this.orderDetails.push(response);
          this.currentOrderDetails.push(response);
          this.orderDetailDataSource = new MatTableDataSource<AddOrderDetail>(this.orderDetails);
          this.resetOrderDetail();
          this.submitOrderDetailProcessing = false;
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
          this.resetOrderDetail();
          this.submitOrderDetailProcessing = false;
        }
      );
  }

  removeOrderDetail(addOrderDetail: AddOrderDetail): void {
    this.orderService.removeOrderDetail(addOrderDetail.orderDetail.id)
      .subscribe(
        response => {
          this.orderDetails.splice(this.orderDetails.indexOf(response), 1);
          this.currentOrderDetails.splice(this.orderDetails.indexOf(response), 1);
          this.orderDetailDataSource = new MatTableDataSource<AddOrderDetail>(this.orderDetails);
          this.resetOrderDetail();
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  saveKOTClicked(): void  {
    if (this.activeOrder.clerkName !== '')  {
      this.printKOT();
    } else  {
      this.toggleKOTDialog();
    }
  }

  toggleKOTDialog(): void {
    const dialogRef = this.dialog.open(PrintKotDialogComponent, {
      width: '550px',
      data: { order: this.activeOrder }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.saveOrder(result)
          .subscribe(
            response => {
              this.activeOrder = response;
              this.printKOT();
            },
            error1 => {
              this.openErrorSnackBar(error1.error.message, 'Close');    
            }
          );
      }
    });
  }

  printKOT(): void  {
    if (this.currentOrderDetails.length === 0) {
      this.orderService.printKOT(this.addOrderDetail.orderDetail.id)
        .subscribe(
          response => {
            if (response === true) {
              this.openSuccessSnackBar('KOT successfully printed', 'Close');
              this.currentOrderDetails = [];
            } else  {
              this.openErrorSnackBar('Could not print KOT', 'Close');
            }
          },
          error1 => {
            this.openErrorSnackBar(error1.error.message, 'Close');
          }
        );
    } else  {
      let orderDetails: OrderDetail[] = [];
      this.currentOrderDetails.map(x => {
        orderDetails.push(x.orderDetail);
      });
      this.orderService.printCurrentKOT(this.activeOrder.id, orderDetails)
        .subscribe(
          response => {
            if (response === true) {
              this.openSuccessSnackBar('KOT successfully printed', 'Close');
              this.currentOrderDetails = [];
            } else  {
              this.openErrorSnackBar('Could not print KOT', 'Close');
            }
            orderDetails = null;
          },
          error1 => {
            this.openErrorSnackBar(error1.error.message, 'Close');
            orderDetails = null;
          }
        );
    }
  }

  fillDetailsClicked(): void  {
    this.toggleOrderDetailsDialog();
  }

  toggleOrderDetailsDialog(): void  {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '550px',
      data: { order: this.activeOrder }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.saveOrder(result)
          .subscribe(
            response => {
              if (response) {
                this.activeOrder = response;
                this.openSuccessSnackBar('Details updated successfully', 'Close');
              }
            },
            error1 => {
              this.openErrorSnackBar(error1.error.message, 'Close');
            }
          );
      }
    });
  }

  printBill(): void {
    if (this.activeOrder.totalPrice === 0) {
      this.openErrorSnackBar('Please fill in the details first.', 'Close');
      return;
    }
    this.orderService.printBill(this.activeOrder.id)
      .subscribe(
        response => {
          if (response === true) {
            this.openSuccessSnackBar('Bill printed successfully', 'Close');
          } else {
            this.openErrorSnackBar('Could not print bill', 'Close');
          }
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  settleClicked(): void {
    this.toggleSettlementDialog();
  }

  toggleSettlementDialog(): void  {
    const dialogRef = this.dialog.open(SettleOrderDialogComponent, {
      width: '550px',
      data: { netAmount: this.activeOrder.netPrice }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result < this.activeOrder.netPrice)  {
          this.openErrorSnackBar('Amount paid cannot be less than the total amount', 'Close');
          return;
        }
        this.activeOrder.amountPaid = result;
        this.activeOrder.settled = true;
        this.activeOrder.orderStatus = ORDER_SETTLED;
        this.orderService.saveOrder(this.activeOrder)
          .subscribe(
            response => {
              if (response) {
                this.activeOrder = response;
                this.toggleCloseOrderDialog();
              }
            },
            error1 => {
              this.openErrorSnackBar(error1.error.message, 'Close');
            }
          );
      }
    });
  }

  toggleCloseOrderDialog(): void  {
    const dialogRef = this.dialog.open(CloseOrderDialogComponent, {
      width: '550px',
      data: { order: this.activeOrder }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeOrder = null;
        this.restaurantService.freeTable(this.activeTable.tableNumber)
          .subscribe(
            response => {
              this.activeTable = response;
              this.restaurantTables[this.restaurantTables.findIndex(x => x.tableNumber === this.activeTable.tableNumber)] = response;
            },
            error1 => {
              this.openErrorSnackBar(error1.error.message, 'Close');
            }
          );
      }
    });
  }

}

