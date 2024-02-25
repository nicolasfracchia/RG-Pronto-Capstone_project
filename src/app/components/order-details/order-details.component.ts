import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonItem, IonIcon, IonLabel, IonFooter, IonToolbar, IonTitle, IonHeader, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/angular/standalone";
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonCardTitle, IonCardContent, IonCardHeader, IonCard, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonFooter, 
    IonLabel, 
    IonIcon, 
    IonItem, 
    IonList, 
    CommonModule
  ]
})
export class OrderDetailsComponent  implements OnInit {
  @Input() order!:Order;
  public colors:string[] = ['', 'medium', 'secondary', 'primary', 'warning', 'success', 'danger'];
  // Waiting for approval - Confirmed - In progress - On the way - Delivered - Cancelled
  
  constructor() { }

  ngOnInit() { }

}
