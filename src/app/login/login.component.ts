import { Component, OnInit } from '@angular/core';
import { ApiService} from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.apiService.login(data, 'employee/login').subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        localStorage.setItem('currentStoreUIUser', response.result.auth);
        this.router.navigate(['/dashboard']);
      } else {
        alert(response.message);
      }
    },
  (error: any) => {
    alert(error.statusText);
  });
  }

}
