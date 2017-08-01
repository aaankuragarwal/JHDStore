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
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    OrderDetailComponent,
    DashboardComponent
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
          {path: '', component: DashboardComponent},
          {path: 'order/:ordId', component: OrderDetailComponent },
          { path: '**', redirectTo: '', pathMatch: 'full' }
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
