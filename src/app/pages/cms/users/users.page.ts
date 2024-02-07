import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { UserType } from 'src/app/interfaces/user-type';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ShowModalComponent } from 'src/app/components/cms/users/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/users/form-modal/form-modal.component';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
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

export class UsersPage {

  users!: User[];
  userTypes!: UserType[];

  constructor(
    private _usersService: UsersService, 
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
    this.getUsers();
    addIcons({eyeOutline, createOutline, trashOutline, add});
    this._usersService.getUserTypes().subscribe((results) => {
      this.userTypes = results;
    });
  }

  getUsers(){
      this._usersService.getUsers().subscribe((results) => {
        this.users = results;
      });
  }

  async show(user:User){
    const modal = await this.modalController.create({
      component: ShowModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.75,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        user: user
      },
    });

    modal.present();
  }

  async formModal(user:User | undefined = undefined){
    const modal = await this.modalController.create({
      component: FormModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.75,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        user: user,
        userTypes: this.userTypes,
        refreshList: this.getUsers.bind(this),
        toast: this.presentToast.bind(this)
      },
    });

    modal.present();
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

  async delete(user:User){

    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this user?`,
      message: `${user.name} ${user.lastName} | ${user.UserType.type}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(user.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._usersService.deleteUser(id).subscribe(
      (result:User) => {
        this.presentToast('User deleted successfully');
        this.getUsers();
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this.presentToast("Error deleting the user: " + error.message, 'danger');
      }
    );
  }

}
