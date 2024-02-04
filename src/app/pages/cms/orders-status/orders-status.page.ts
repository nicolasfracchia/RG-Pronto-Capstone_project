import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderStatus } from 'src/app/interfaces/order-status';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ShowModalComponent } from 'src/app/components/cms/orders-status/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/orders-status/form-modal/form-modal.component';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.page.html',
  styleUrls: ['./orders-status.page.scss'],
  standalone: true,
  providers: [
    ModalController
  ],
  imports: [  
    CommonModule,
    HeaderComponent,
    ShowModalComponent,
    FormModalComponent,
    IonContent,
    IonList,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonIcon,
    IonModal,
    IonFab,
    IonFabButton
  ]
})
export class OrdersStatusPage {

  statuses!: OrderStatus[];

  constructor(
    private _ordersService: OrdersService, 
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
    this.getStatuses();
    addIcons({eyeOutline, createOutline, trashOutline, add})
  }

  getStatuses(){
      this._ordersService.getAllOrdersStatus().subscribe((results) => {
        this.statuses = results;
      });
  }

  async show(status:OrderStatus){
    const modal = await this.modalController.create({
      component: ShowModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        orderStatus: status
      },
    });

    await modal.present();
  }

  async formModal(status:OrderStatus | undefined = undefined){
    const modal = await this.modalController.create({
      component: FormModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        orderStatus: status,
        refreshList: this.getStatuses.bind(this),
        toast: this.presentToast.bind(this)
      },
    });

    await modal.present();
  }

  async presentToast(message:string, color:string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color
    });

    await toast.present();
  }

  async delete(status:OrderStatus){

    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this status?`,
      message: `${status.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(status.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._ordersService.deleteOrdersStatus(id).subscribe(
      (result:OrderStatus) => {
        this.presentToast('Status deleted successfully');
        this.getStatuses();
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this.presentToast("Error deleting the status: " + error.message, 'danger');
      }
    );
  }

}
