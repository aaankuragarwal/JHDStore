import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from '../Services/api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: any= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  orderData: any;
  user: any;
  paramSub: any;
  constructor(private route: ActivatedRoute,
  private apiService: ApiService) { }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      console.log(params['ordId']);
      if (params['ordId']) {
        this.apiService.getData('store/orders/detail?order_id=' + params['ordId']).subscribe((response: any) => {
          if (response.success) {
            console.log(response.message);
            // this.orderDetail = response.result.order;
            this.orderData = response.result.order;
            this.user = response.result.user;
          } else {
            alert(response.message);
          }
        },
        (error: any) => {
          alert(error.statusText);
        });
      }
    });
  }

}
