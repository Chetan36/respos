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
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {NewCategoryDialogComponent} from './components/new-category-dialog/new-category-dialog.component';
import {NewProductDialogComponent} from './components/new-product-dialog/new-product-dialog.component';
import {SwapTableDialogComponent} from './components/swap-table-dialog/swap-table-dialog.component';
import { PrintKotDialogComponent } from './components/print-kot-dialog/print-kot-dialog.component';
import { ExtraItemDialogComponent } from './components/extra-item-dialog/extra-item-dialog.component';

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
    ExtraItemDialogComponent
  ],
})
export class MaterialModule { }
