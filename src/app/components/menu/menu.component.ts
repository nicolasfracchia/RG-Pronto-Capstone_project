import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, home, list, menu, receipt, send, apps } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel
  ]
})
export class MenuComponent {
  public pageTitle: string = "Tasks list";

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'In-store Menu', url: '/menu', icon: 'menu' },
    { title: 'Catering Menu', url: '/catering', icon: 'receipt' },
    { title: 'Contact', url: '/contact', icon: 'send' },
    { title: 'ORDER HERE', url: '/order', icon: 'cart' },
  ];
  public appPagesCms = [
    { title: 'Categories', url: '/cms/categories', icon: 'apps' },
  ];
  
  constructor() {
    addIcons({ home, menu, receipt, send, cart, apps });
  }

}
