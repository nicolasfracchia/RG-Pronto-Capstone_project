import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonItemGroup, IonContent, IonNote } from "@ionic/angular/standalone";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [IonNote, IonContent, IonItemGroup, 
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
  ]
})
export class OrdersListComponent  implements OnInit {
  @Input() orders!:Order[];
  public colors:string[] = ['', 'medium', 'secondary', 'primary', 'warning', 'success', 'danger'];
      // Waiting for approval - Confirmed - In progress - On the way - Delivered - Cancelled
  

  constructor() { }

  ngOnInit() {}

}
