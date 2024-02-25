import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/home/menu/menu.component'; 
import { LoginComponent } from 'src/app/components/home/login/login.component'; 
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule, 
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
