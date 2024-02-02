import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonRow ,IonText ,IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonText, 
    IonContent,
    CommonModule, 
    FormsModule,
    HeaderComponent,

    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonText,
    IonItem
  ]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
