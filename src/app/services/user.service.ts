import { inject, Injectable } from '@angular/core';
import { User } from '../Models/user/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private apiUrl = 'https://localhost:5001/api/Users';
  usersList: User[] = []
  http: HttpClient = inject(HttpClient)
  getUserIndex(currentUser: User):number {
    return this.usersList.findIndex(user => user.id == currentUser.id)
   }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getByIndex(index: number): User {
    return this.usersList[index]
  }
  creatUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }
  deleteUser(userIdToDelete: User):Observable<Object>  {
    return this.http.delete(`${this.apiUrl}/${userIdToDelete.id}`)
  }
  UppdateUser(userToUpdate: User):Observable<Object> {
    return this.http.put(`${this.apiUrl}/${userToUpdate.id}`, userToUpdate)
  }
  Login(form:any,):Observable<User> {
    
    return this.http.post<User>(`${this.apiUrl}/login?email=${form.email}&password=${form.password}`,"")
  }
}
