import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../folder.service';
import { Folder, Task } from '../models';

@Component({
  selector: 'app-personal-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-tasks.component.html',
  styleUrl: './personal-tasks.component.css',
})
export class PersonalTasksComponent implements OnInit {
  private folderService: FolderService;
  private taskService: TaskService;

  constructor(folderService: FolderService, taskService: TaskService) {
    this.folderService = folderService;
    this.taskService = taskService;
  }

  ngOnInit(): void {
    this.folderService.getFolders().then((folders) => {
      this.folders = folders;
    });
  }

  folders: Folder[] = [];
  tasks: Task[] = [];

  selectedFolder: number = -1;
  newFolder: string = '';
  highlightedFolder: number = -1;

  onSelectFolder(index: number): void {
    this.selectedFolder = index;
    this.taskService.getTasksByFolder(this.folders[index].id).then((tasks) => {
      this.tasks = tasks;
    });
  }

  async onCreateFolder(): Promise<void> {
    if (this.newFolder.trim() === '') return;

    await this.folderService.createFolder(this.newFolder);

    this.folders = await this.folderService.getFolders();
    this.selectedFolder = -1;

    this.newFolder = '';
  }

  async onDeleteFolder(folderId: number): Promise<void> {
    await this.folderService.deleteFolder(folderId);

    this.folders = await this.folderService.getFolders();
    this.selectedFolder = -1;
  }

  showDeleteButton(index: number): void {
    this.highlightedFolder = index;
  }

  hideDeleteButton(index: number): void {
    this.highlightedFolder = -1;
  }
}
