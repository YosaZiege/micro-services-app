import { Routes } from '@angular/router';
import { Customers } from './pages/customers/customers';
import { Products } from './pages/products/products';
import { BillComponent } from './pages/bill/bill';

export const routes: Routes = [
  { path: 'customers', component: Customers },
  { path: 'products', component: Products },
  { path: 'bill', component: BillComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' }
];
