
import { Component, OnInit } from '@angular/core';
import { ApiService} from '../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orderList: any;
  status:string="new";
  constructor(
    private apiService: ApiService) { }

  ngOnInit() {
    this.getOrder('new');
  }

  getOrder(status: string) {
    this.status = status;
    this.apiService.getData('store/orders?status=' + status).subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        this.orderList = response.result.order;
      } else {
        alert(response.message);
      }
    },
    (error: any) => {
      alert(error.statusText);
    });

  }

}
