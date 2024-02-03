import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsBySection } from '../interfaces/products-by-section';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  getProductsByWebSection(web:string){
    return this.http.get<ProductsBySection[]>(`http://127.0.0.1:3000/products/sections/${web}`);
  }  
}
