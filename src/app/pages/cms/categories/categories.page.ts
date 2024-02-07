import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ShowModalComponent } from 'src/app/components/cms/categories/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/categories/form-modal/form-modal.component';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
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
export class CategoriesPage{

  categories!: Category[];

  constructor(
    private _categoriesService: CategoriesService, 
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
    this.getCategories();
    addIcons({eyeOutline, createOutline, trashOutline, add})
  }

  getCategories(){
      this._categoriesService.getCategories().subscribe((results) => {
        this.categories = results;
      });
  }

  async show(category:Category){
    const modal = await this.modalController.create({
      component: ShowModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        category: category
      },
    });

    await modal.present();
  }

  async formModal(category:Category | undefined = undefined){
    const modal = await this.modalController.create({
      component: FormModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        category: category,
        refreshList: this.getCategories.bind(this),
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

  async delete(category:Category){

    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this category?`,
      message: `${category.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(category.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._categoriesService.deleteCategory(id).subscribe(
      (result:Category) => {
        this.presentToast('Category deleted successfully');
        this.getCategories();
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this.presentToast("Error deleting the category: " + error.message, 'danger');
      }
    );
  }

}
