import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus } from '../interfaces/order-status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor( private http: HttpClient ) { }

  // ORDERS STATUS CRUD
  getAllOrdersStatus(){
    return this.http.get<OrderStatus[]>(`${environment.apiURL}ordersstatus`);
  }
  getOrdersStatus(id:number){
    return this.http.get<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`);
  }
  updateOrdersStatus(id:number, formData:FormData){
    return this.http.put<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`,formData);
  }
  newOrdersStatus(formData: FormData){
    return this.http.post<OrderStatus>(`${environment.apiURL}ordersstatus`,formData);
  }
  deleteOrdersStatus(id:number){
    return this.http.delete<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`);
  }
}
