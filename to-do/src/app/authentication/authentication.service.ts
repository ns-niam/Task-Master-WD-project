import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Token } from "../models";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  BASE_URL = 'http://localhost:8000';


  constructor(private http: HttpClient) {
  }

  signIn(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(
      `${this.BASE_URL}/api/login/`,
      {username, password}
    )
  }
}
