import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Folder, Task } from './models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  BASE_URL: string = 'http://localhost:8000/api';

  constructor(private client: HttpClient) {}

  // getTasks(user_id: number): Observable<Task> {
  //   return this.client.get<Task>(`${this.BASE_URL}/user/${user_id}/tasks`);
  // }

  async getTasks(): Promise<Task[]> {
    var tasks: Task[] | undefined = [];

    var userId = localStorage.getItem('id');

    tasks = await firstValueFrom(
      this.client.get<Task[]>(`${this.BASE_URL}/user/${userId}/tasks`)
    );

    if (tasks === undefined) {
      tasks = [];
    }

    return tasks;
  }

  async getTasksByFolder(folderId: number): Promise<Task[]> {
    var tasks: Task[] | undefined = [];

    var userId = localStorage.getItem('id');

    tasks = await firstValueFrom(
      this.client.get<Task[]>(
        `${this.BASE_URL}/user/${userId}/folder/${folderId}`
      )
    );

    if (tasks === undefined) {
      tasks = [];
    }

    return tasks;
  }

  addTask(user_id: number, taskData: any): Observable<Task> {
    return this.client.post<Task>(
      `${this.BASE_URL}/user/${user_id}/tasks`,
      taskData
    );
  }
}
