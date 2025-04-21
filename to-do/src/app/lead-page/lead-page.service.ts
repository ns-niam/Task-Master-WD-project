import { Injectable } from '@angular/core';
import { User } from "../models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeadPageService {

  BASE_URL: string = 'http://localhost:8000/api'

  constructor(private client: HttpClient) {
  }
  getUserByTeam(id:number): Observable<User[]>{
    return this.client.get<User[]>(`${this.BASE_URL}/users/team/${id}`)
  }
}
