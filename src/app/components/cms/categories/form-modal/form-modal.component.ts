import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel ,IonDatetimeButton ,IonInput ,IonTextarea ,IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Category } from 'src/app/interfaces/category';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

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

  @Input() category:Category | undefined;
  @Input() refreshList:any;
  @Input() toast:any;
  frm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private _categoriesService: CategoriesService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.frm.patchValue({name: this.category?.name});
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.category){
      this.update();
    }else{
      this.create();
    }
    // ACTUALIZAR LISTADO
    return true;
  }

  update():any{
    if(this.category?.id){
      this._categoriesService.updateCategory(this.category.id, this.frm.value).subscribe((result:Category) => {
        this.refreshList();
        this.toast('Category updated successfuly!');
        this.closeModal();
      });
    }else{
      return false;
    }
  }

  create(){
    this._categoriesService.newCategory(this.frm.value).subscribe((result:Category) => {
      this.frm.reset();
      this.refreshList();
      this.toast('Category created successfuly!');
      this.closeModal();
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
