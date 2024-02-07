import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel ,IonDatetimeButton ,IonInput ,IonTextarea ,IonModal, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { User } from 'src/app/interfaces/user';
import { UserType } from 'src/app/interfaces/user-type';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
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
    IonSelect,
    IonSelectOption
  ]
})
export class FormModalComponent  implements OnInit {

  @Input() user:User | undefined;
  @Input() refreshList:any;
  @Input() toast:any;
  @Input() userTypes!:UserType[];
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _usersService: UsersService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
    console.log('LLEGA MODAL USERS - FRM:');
    console.log('USER MODAL: ',this.user);
  }

  ngOnInit() {
    this.frm.patchValue({
      name: this.user?.name,
      lastName: this.user?.lastName,
      address: this.user?.address,
      email: this.user?.email,
      type: this.user?.UserType.id
    });

    console.log('LLEGA MODAL USERS - FRM - ONINIT:');
    console.log('USER MODAL - ONINIT: ',this.user);
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.user){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.user?.id){
      this._usersService.updateUser(this.user.id, this.frm.value).subscribe((result:User) => {
        this.refreshList();
        this.toast('User updated successfuly!');

      });
    }else{
      return false;
    }
  }

  create(){
    this._usersService.newUser(this.frm.value).subscribe((result:User) => {
      this.frm.reset();
      this.refreshList();
      this.toast('User created successfuly!');

    });
  }

  closeModal(){
    return true;
  }

}
