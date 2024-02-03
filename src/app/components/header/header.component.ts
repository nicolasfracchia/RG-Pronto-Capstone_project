import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar ,IonImg ,IonGrid ,IonRow ,IonCol ,IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonText, IonCol, IonRow, IonGrid, IonImg, 
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonImg,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class HeaderComponent  implements OnInit {
  @Input() pageTitle:string = 'asd';
  constructor() { }

  ngOnInit() {}

}