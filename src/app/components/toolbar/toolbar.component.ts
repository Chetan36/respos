import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {InventoryService} from '../../services/inventoryService/inventory.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  inventoryOpen: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('Staff')) {
      this.router.navigate(['/login']);
    }
    this.checkInventoryClosed();
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

  toggleInventory(): void {
    this.toggleInventoryConfirmation();
  }

  toggleInventoryConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '150px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.inventoryOpen) {
          this.closeInventory();
        } else  {
          this.openInventory();
        }
      }
    });
  }

  openInventory(): void {
    this.inventoryService.openInventory()
      .subscribe(
        response => {
          this.inventoryOpen = true;
          this.openSuccessSnackBar('Inventory opening successful', 'Close');
          console.log(response);
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  closeInventory(): void  {
    this.inventoryService.closeInventory()
      .subscribe(
        response => {
          console.log(response);
          this.inventoryOpen = false;
          if (response === null) {
            this.inventoryOpen = true;
          }
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  checkInventoryClosed(): void  {
    this.inventoryService.checkInventoryClosed()
      .subscribe(
        response => {
          this.inventoryOpen = false;
          if (!response) {
            this.inventoryOpen = true;
          }
        },
        error1 => {
          this.openErrorSnackBar(error1.error.message, 'Close');
        }
      );
  }

  logoutUser(): void  {
    this.logoutConfirmation();
  }

  logoutConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '150px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}
