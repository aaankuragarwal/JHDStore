import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent, children: [
        {path: 'login', component: LoginComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' }
      ]}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
