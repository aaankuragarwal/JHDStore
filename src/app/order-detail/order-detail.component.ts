import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from '../Services/api.service';
import {Modal } from 'ng2-modal';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderData: any;
  user: any;
  slot: any;
  paramSub: any;
  address: any;
  products: any;
  orderId: any;
  tempPrice: any;
  tempQuant: any;
  cancelMsg = '';
  updateMsg = '';
  addP: any = {
    product_id: 568,
    quantity: 0,
    comments: ''
  };
  nextStatus: any = {
    'new': 'accepted',
    'accepted': 'processed',
    'processed': 'out_for_delivery',
    'out_for_delivery': 'delivered'
  };
  constructor(private route: ActivatedRoute,
  private apiService: ApiService) { }
  @ViewChild('removeOrder') removeOrder: Modal;
  @ViewChild('UpdateOrder') UpdateOrder: Modal;
  @ViewChild('addProduct') addProduct: Modal;

  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      console.log(params['ordId']);
      if (params['ordId']) {
        this.orderId = params['ordId'];
        this.apiService.getData('store/orders/detail?order_id=' + params['ordId']).subscribe((response: any) => {
          if (response.success) {
            console.log(response.message);
            // this.orderDetail = response.result.order;
            this.orderData = response.result.order;
            this.user = response.result.user;
            this.slot = response.result.slot[0];
            this.address = response.result.address[0];
            this.products = [];
            for (const key in response.result.products) {
                if (response.result.products.hasOwnProperty(key)) {
                  response.result.products[key].isModify = false;
                  response.result.products[key]['product_id'] = +key;
                  response.result.products[key].comments = '';
                  this.products.push(response.result.products[key]);
                }
            }
              console.log(this.products);
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

  updateProduct(i: number, isDelete: boolean) {
    console.log(this.products[i]);
    this.products[i].isModify = false;
    const data = {
      'order_id': this.orderId,
      'products': [this.products[i]]
    };
    if (isDelete) {
      data.products[0].quantity = 0;
      data.products[0].price = null;
      this.products.splice(i, 1);
    }
    this.apiService.postData(data, 'store/orders/modify').subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        if (response.success) {
          // removeOrder.open();
          alert(response.message);
        }
      } else {
        alert(response.message);
      }
    },
    (error: any) => {
      alert(error.statusText);
    });
  }

  productKeyPressed(e: any, product: any, i: any) {
    if (e.keyCode === 27) {
        product.price = this.tempPrice;
        product.quantity = this.tempQuant;
        product.isModify = false;
    } else if (e.keyCode === 13) {
      this.updateProduct(i, false);
    }
  }

  cancelOrder() {
    const data = {
      order_id: this.orderId,
      comments: this.cancelMsg,
      status: 'cancelled'
    };
    this.apiService.postData(data, 'store/orders/process').subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        if (response.success) {
          // removeOrder.open();
          alert(response.message);
        }
      } else {
        alert(response.message);
      }
    },
    (error: any) => {
      alert(error.statusText);
    });
  }

  updateOrd() {
    const data = {
      order_id: this.orderId,
      comments: this.updateMsg,
      status: this.nextStatus[this.orderData.status]
    };
    this.apiService.postData(data, 'store/orders/process').subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        if (response.success) {
          // removeOrder.open();
          alert(response.message);
        }
      } else {
        alert(response.message);
      }
    },
    (error: any) => {
      alert(error.statusText);
    });
  }

  addProd() {
    const data = {
      order_id: this.orderId,
      products: [this.addP]
    };
    this.apiService.postData(data, 'store/orders/modify').subscribe((response: any) => {
      if (response.success) {
        console.log(response.message);
        if (response.success) {
          // removeOrder.open();
          alert(response.message);
        }
      } else {
        alert(response.message);
      }
    },
    (error: any) => {
      alert(error.statusText);
    });

  }

}
