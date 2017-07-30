import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './Services/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ApiService } from './Services/api.service';
import { ContainerComponent } from './container/container.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    NewOrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent, children: [
        {path: 'login', component: LoginComponent },
        {path: 'dashboard', component: ContainerComponent, canActivate: [AuthGuard] , children: [
          {path: 'new', component: NewOrderComponent },
          {path: 'order', component: OrderDetailComponent },
          { path: '', redirectTo: 'new', pathMatch: 'full' }
        ]},
        { path: '', redirectTo: 'login', pathMatch: 'full' }
      ]}
    ]),
  ],
  providers: [
    ApiService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
