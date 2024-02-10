import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Product } from 'src/app/interfaces/product';
import { Category } from 'src/app/interfaces/category';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { GeneralService } from 'src/app/services/general.service';

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

  @Input() modalID!:string;
  @Input() product:Product | undefined;
  @Input() categories!:Category[];
  
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _generalService: GeneralService,
    private _productsService: ProductsService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      image: [''],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.frm.patchValue({
      name: this.product?.name,
      image: this.product?.image,
      categoryId: this.product?.Category?.id,
    });
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.product){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.product?.id){
      this._productsService.updateProduct(this.product.id, this.frm.value).subscribe((result:Product) => {
        this._generalService.presentToast('Product updated successfuly.');
        this.closeModal({'updated':true});
      });
    }else{
      return false;
    }
  }

  create(){
    this._productsService.newProduct(this.frm.value).subscribe((result:Product) => {
      this.frm.reset();
      this._generalService.presentToast('Product created successfuly.');
      this.closeModal({'created':result});
    });
  }

  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }

  

}
