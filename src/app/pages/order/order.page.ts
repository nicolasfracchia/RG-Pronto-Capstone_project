import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonItem, IonList, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonImg, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, removeCircleSharp } from 'ionicons/icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCol, IonRow, IonGrid, IonImg, 
    HeaderComponent,
    CommonModule,
    IonContent,
    IonList,
    IonItem, 
    IonLabel, 
    IonAccordion, 
    IonAccordionGroup, 
    IonCardContent, 
    IonCardTitle, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCard, 
    IonThumbnail
  ]
})
export class OrderPage implements OnInit {
  public arrayNumsForTesting1: number[];
  public arrayNumsForTesting2: number[];


  constructor() {
   this.arrayNumsForTesting1 = Array.from({length: 15}, (_, i) => i);
   this.arrayNumsForTesting2 = Array.from({length: 3}, (_, i) => i);
   addIcons({addCircleSharp, removeCircleSharp})
  }

  ngOnInit() {
  }
}
