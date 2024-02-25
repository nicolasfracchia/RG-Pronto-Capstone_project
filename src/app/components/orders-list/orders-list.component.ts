import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonItemGroup, IonContent, IonNote } from "@ionic/angular/standalone";
import { GeneralService } from 'src/app/services/general.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [
    OrderDetailsComponent,
    CommonModule,
    IonList,
    IonItem,
    IonNote,
  ]
})
export class OrdersListComponent  implements OnInit {
  @Input() orders!:Order[];
  public colors:string[] = ['', 'medium', 'secondary', 'primary', 'warning', 'success', 'danger'];
      // Waiting for approval - Confirmed - In progress - On the way - Delivered - Cancelled
  

  constructor(
    private _generalService: GeneralService
  ) { }

  ngOnInit() {}

  async orderDetails(order:Order | undefined = undefined){
    const componentProps = {
      order: order
    }
    const modal = await this._generalService.loadModal('orderDetails', OrderDetailsComponent, componentProps, 0, 'modal-dialog');

    modal.present();
  }

}
