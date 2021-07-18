import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeNavComponent } from './components/employee-nav/employee-nav.component';
import { EmployeeLogoutComponent } from './components/employee-logout/employee-logout.component';
import { StoreComponent } from './components/store/store.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { GameSearchComponent } from './components/game-search/game-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LogoutComponent,
    RegisterComponent,
    NavComponent,
    EmployeeComponent,
    EmployeeLoginComponent,
    EmployeeNavComponent,
    EmployeeLogoutComponent,
    StoreComponent,
    CatalogComponent,
    GameSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
