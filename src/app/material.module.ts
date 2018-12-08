import {
  MatAutocompleteModule, MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {NewCategoryDialogComponent} from './components/new-category-dialog/new-category-dialog.component';
import {NewProductDialogComponent} from './components/new-product-dialog/new-product-dialog.component';
import {SwapTableDialogComponent} from './components/swap-table-dialog/swap-table-dialog.component';
import { PrintKotDialogComponent } from './components/print-kot-dialog/print-kot-dialog.component';
import {OrderDetailsDialogComponent} from './components/order-details-dialog/order-details-dialog.component';
import {SettleOrderDialogComponent} from './components/settle-order-dialog/settle-order-dialog.component';
import {CloseOrderDialogComponent} from './components/close-order-dialog/close-order-dialog.component';

@NgModule({
  imports: [
    MatAutocompleteModule, MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  exports: [
    MatAutocompleteModule, MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    NewCategoryDialogComponent,
    NewProductDialogComponent,
    SwapTableDialogComponent,
    PrintKotDialogComponent,
    OrderDetailsDialogComponent,
    SettleOrderDialogComponent,
    CloseOrderDialogComponent
  ],
})
export class MaterialModule { }
