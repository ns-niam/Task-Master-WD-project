import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = 'http://localhost:8000/api'
  constructor(private client: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.client.get<User[]>(`${this.BASE_URL}/users/`)
  }

  getUser(username:string): Observable<User>{
    return this.client.get<User>(`${this.BASE_URL}/user/${username}`)
  }

  getUser2(username:string): Observable<User>{
    return this.client.get<User>(`${this.BASE_URL}/users/${username}`)
  }

  editUser(username:string, userData: any): Observable<User>{
    return this.client.put<User>(`${this.BASE_URL}/user/${username}`, userData)
  }

  editUser2(username:string, userData: any): Observable<User>{
    return this.client.put<User>(`${this.BASE_URL}/users/${username}`, userData)
  }
}
