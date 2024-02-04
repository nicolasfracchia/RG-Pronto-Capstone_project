import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsBySection } from '../interfaces/products-by-section';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  getProductsByWebSection(web:string){
    return this.http.get<ProductsBySection[]>(`${environment.apiURL}products/sections/${web}`);
  }  
}
