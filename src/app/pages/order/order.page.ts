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

  private updatingUnits:boolean = false;


  constructor() {
   this.arrayNumsForTesting1 = Array.from({length: 15}, (_, i) => i);
   this.arrayNumsForTesting2 = Array.from({length: 3}, (_, i) => i);
   addIcons({addCircleSharp, removeCircleSharp})
  }

  ngOnInit() {
  }

  addUnit(id:string){
    this.updateUnits(id, 'add');
  }

  removeUnit(id:string){
    this.updateUnits(id, 'remove');
  }

  updateUnits(id:string, type:string){
    if(!this.updatingUnits){
      this.updatingUnits = true;
    
      const element = document.getElementById(id);
    
      if(element){
        const q = parseInt(element.innerHTML);
        let newQ = 0;
        
        if(type === 'add'){
          newQ = q + 1;
        }else if (type === 'remove'){
          newQ = (q === 0) ? 0 : q - 1;
        }

        element.innerHTML = newQ.toString();
      }
      
      this.updatingUnits = false;
    }
  }


}
