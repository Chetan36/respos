import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { LoginComponent } from './login/login.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { KioskComponent } from './kiosk/kiosk.component';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RecipeComponent } from './recipe/recipe.component';
import { StaffComponent } from './staff/staff.component';
import { ReportComponent } from './report/report.component';
import {HttpClientModule} from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchPipe } from './search.pipe';
import { StockActionComponent } from './stock-action/stock-action.component';
import {FormsModule} from '@angular/forms';
import { NewCategoryDialogComponent } from './components/new-category-dialog/new-category-dialog.component';
import { NewProductDialogComponent } from './components/new-product-dialog/new-product-dialog.component';
import { SwapTableDialogComponent } from './components/swap-table-dialog/swap-table-dialog.component';
import { ExtraItemDialogComponent } from './components/extra-item-dialog/extra-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    KioskComponent,
    OrdersComponent,
    InventoryComponent,
    RecipeComponent,
    StaffComponent,
    ReportComponent,
    ToolbarComponent,
    SettingsComponent,
    SearchPipe,
    StockActionComponent,
    NewCategoryDialogComponent,
    NewProductDialogComponent,
    SwapTableDialogComponent,
    ExtraItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
