import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';


import { CatelogComponent } from './catalog/catalog.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { CatalogEditComponent } from './catalog-edit/catalog-edit.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, LogoutComponent, CatelogComponent,
    GameSearchComponent,
    GameEditComponent,
    CatalogEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
