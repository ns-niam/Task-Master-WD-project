import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Folder } from './models';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  BASE_URL: string = 'http://localhost:8000/api';
  constructor(private client: HttpClient) {}

  async getFolders(): Promise<Folder[]> {
    var folders: Folder[] | undefined = [];

    var userId = localStorage.getItem('id');

    folders = await firstValueFrom(
      this.client.get<Folder[]>(`${this.BASE_URL}/folders/${userId}`)
    );

    if (folders === undefined) {
      folders = [];
    }

    return folders;
  }

  async createFolder(folderName: string): Promise<void> {
    var userId = localStorage.getItem('id');

    await firstValueFrom(
      this.client.post<Folder[]>(`${this.BASE_URL}/folders/${userId}`, {
        name: folderName,
      })
    );
  }

  async deleteFolder(folderId: number): Promise<void> {
    await firstValueFrom(
      this.client.delete(`${this.BASE_URL}/folders/delete/${folderId}`)
    );
  }
}
