import { Component, OnInit } from '@angular/core';
import { ApiService} from '../Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  constructor(
    private apiService: ApiService
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
        alert(response.message);
      } else {
        alert(response.message);
      }
    },
  (error: any) => {
    alert(error.statusText);
  });
  }

}
