import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FolderService } from "./folder.service";
import { Folder } from "../models";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  standalone: true,
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  folders!: Folder[];
  folder: string = '';
  deadline: Date | undefined;
  title: string = '';
  taskText: string = '';
  file: File | undefined;
  userId = Number(localStorage.getItem("id"))
  constructor(
    private createTaskService: FolderService,
    private taskService: TaskService
    ) { }

  ngOnInit() {
    this.getFolders();
  }

  getFolders() {
    this.createTaskService.getFolderByUser(this.userId).subscribe((folders) => {
      this.folders = folders;
    });
  }

  addTask() {
    if (this.taskText == '' || this.folder == '' || this.title == ''){
      alert("Fill in all fields");
    }
    else {
      const NewTask = {
        created_by: localStorage.getItem("username"),
        folder: this.folder,
        deadline: this.deadline,
        title: this.title,
        taskText: this.taskText
      }

      this.taskService
        .addTask(this.userId, NewTask)
        .subscribe((data) =>{
          alert(`Task added, details: ${this.folder}, ${this.deadline}, ${this.title}, ${this.taskText},`)
          this.folder = '';
          this.deadline = undefined;
          this.taskText = '';
          this.title = '';

        });
    }

  }
}
