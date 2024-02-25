import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class OrdersListComponent  implements OnInit {
  @Input() orders!:Order[];

  constructor() { }

  ngOnInit() {}

}
