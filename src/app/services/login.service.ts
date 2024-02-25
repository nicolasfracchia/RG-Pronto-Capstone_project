import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, map, switchMap } from 'rxjs';
import { RouteRoles } from '../interfaces/route-roles';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private routesRoles:RouteRoles = {
    cms_categories: [1],
    cms_orders_status: [1],
    cms_sections: [1],
    cms_users: [1],
    cms_products: [1],
    user_profile: [1,2,3],
    order_history: [1,2,3],
  }

  constructor( 
    private http: HttpClient,
    private router: Router,
    private storage: StorageMap
  ) { }

  // LOGIN
  loginUser(formData: any){
    return this.http.post<any>(`${environment.apiURL}users/login`, formData);
  }
  getLoggedUser(): Observable<any>{
    return this.storage.get('user');
  }
  getToken(){
    this.storage.get('user').subscribe({
      next: (user) => {
        return user;
      },
      error: (error) => {
        return false;
      }
    });
  }
  logoutUser(){
    this.storage.clear().subscribe(() => {});
    this.router.navigate(['/home']);
  }
  getRoleAccess(routeName:string): number[] | undefined{
    return this.routesRoles[routeName];
  }
  getAllRoleAccess(): RouteRoles{
    return this.routesRoles;
  }
  

}