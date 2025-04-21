import { Injectable } from '@angular/core';
import {Folder} from "../models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FolderService {

  BASE_URL: string = 'http://localhost:8000/api'
  constructor(private client: HttpClient) {
  }

  getFolderByUser(user_id:number): Observable<Folder[]>{
    return this.client.get<Folder[]>(`${this.BASE_URL}/folders/${user_id}`)
  }

}
