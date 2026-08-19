import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product';
import { DisplayProductComponent } from './components/display-product/display-product';

export const routes: Routes = [
	{ path: 'addProduct', component: AddProductComponent },
	{ path: 'displayProduct', component: DisplayProductComponent },
	{ path: '', redirectTo: 'addProduct', pathMatch: 'full' },
	{ path: '**', redirectTo: 'addProduct' }
];
