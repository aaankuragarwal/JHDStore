import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from '../Services/api.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html'
})
export class NewOrderComponent implements OnInit {


  constructor(private route: ActivatedRoute,
  private apiService: ApiService) { }

  ngOnInit() {

  }

}
