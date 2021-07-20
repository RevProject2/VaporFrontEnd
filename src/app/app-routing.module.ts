import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeeLogoutComponent } from './components/employee-logout/employee-logout.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'employeeLogin', component: EmployeeLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employeeLogout', component: EmployeeLogoutComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user', component: UserComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
