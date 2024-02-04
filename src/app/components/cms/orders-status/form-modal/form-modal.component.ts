import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel ,IonDatetimeButton ,IonInput ,IonTextarea ,IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { OrderStatus } from 'src/app/interfaces/order-status';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  standalone:true,
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,  
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons, 
    IonIcon,
    IonButton,
    IonInput, 
    IonItem, 
    IonList,
  ]
})
export class FormModalComponent  implements OnInit {

  @Input() orderStatus:OrderStatus | undefined;
  @Input() refreshList:any;
  @Input() toast:any;
  frm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private _ordersStatusService: OrdersService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.frm.patchValue({name: this.orderStatus?.name});
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.orderStatus){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.orderStatus?.id){
      this._ordersStatusService.updateOrdersStatus(this.orderStatus.id, this.frm.value).subscribe((result:OrderStatus) => {
        this.refreshList();
        this.toast('Status name updated successfuly!');
        this.closeModal();
      });
    }else{
      return false;
    }
  }

  create(){
    this._ordersStatusService.newOrdersStatus(this.frm.value).subscribe((result:OrderStatus) => {
      this.frm.reset();
      this.refreshList();
      this.toast('Order status created successfuly!');
      this.closeModal();
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
