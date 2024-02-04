import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SectionsService } from 'src/app/services/sections.service';
import { Section } from 'src/app/interfaces/section';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ShowModalComponent } from 'src/app/components/cms/sections/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/sections/form-modal/form-modal.component';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
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
export class SectionsPage{

  sections!: Section[];

  constructor(
    private _sectionsService: SectionsService, 
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
    this.getSections();
    addIcons({eyeOutline, createOutline, trashOutline, add})
  }

  getSections(){
      this._sectionsService.getSections().subscribe((results) => {
        this.sections = results;
      });
  }

  async show(section:Section){
    const modal = await this.modalController.create({
      component: ShowModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        section: section
      },
    });

    await modal.present();
  }

  async formModal(section:Section | undefined = undefined){
    const modal = await this.modalController.create({
      component: FormModalComponent,
      handleBehavior: 'cycle',
      initialBreakpoint:0.25,
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {
        section: section,
        refreshList: this.getSections.bind(this),
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

  async delete(section:Section){

    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this section?`,
      message: `${section.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(section.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._sectionsService.deleteSection(id).subscribe(
      (result:Section) => {
        this.presentToast('Section deleted successfully');
        this.getSections();
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this.presentToast("Error deleting the section: " + error.message, 'danger');
      }
    );
  }

}
