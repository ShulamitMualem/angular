import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleType, User } from '../Models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/Users';
  private currentUser: User | null = null;
  http=inject(HttpClient)
  constructor() { }

  Login(form:any,):Observable<User> {
    
    return this.http.post<User>(`${this.apiUrl}/login?email=${form.email}&password=${form.password}`,"")
  }
  
  hasRole(requiredRoles: RoleType[]): boolean {
    this.currentUser=JSON.parse(sessionStorage.getItem("user")||"[]")
    if (!this.currentUser) 
    return false;
  console.log(requiredRoles.includes(this.currentUser.role));
  
    return  requiredRoles.includes(this.currentUser.role)
 
  }

}
