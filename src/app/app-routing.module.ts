import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {KioskComponent} from './kiosk/kiosk.component';
import {OrdersComponent} from './orders/orders.component';
import {InventoryComponent} from './inventory/inventory.component';
import {RecipeComponent} from './recipe/recipe.component';
import {StaffComponent} from './staff/staff.component';
import {ReportComponent} from './report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'kiosk', component: KioskComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
