import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel ,IonDatetimeButton ,IonInput ,IonTextarea ,IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Section } from 'src/app/interfaces/section';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionsService } from 'src/app/services/sections.service';

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
  ]
})
export class FormModalComponent  implements OnInit {

  @Input() section:Section | undefined;
  @Input() refreshList:any;
  @Input() toast:any;
  frm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private _secionsService: SectionsService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      web: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.frm.patchValue({name: this.section?.name, web: this.section?.web});
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.section){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.section?.id){
      this._secionsService.updateSection(this.section.id, this.frm.value).subscribe((result:Section) => {
        this.refreshList();
        this.toast('Section updated successfuly!');
        this.closeModal();
      });
    }else{
      return false;
    }
  }

  create(){
    this._secionsService.newSection(this.frm.value).subscribe((result:Section) => {
      this.frm.reset();
      this.refreshList();
      this.toast('Section created successfuly!');
      this.closeModal();
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
