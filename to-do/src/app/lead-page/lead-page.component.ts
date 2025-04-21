import { Component, OnInit } from '@angular/core';
import { User, Notification } from '../models';
import { LeadPageService } from './lead-page.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { NotificationService } from '../notifications/notifications.service';

@Component({
  standalone: true,
  selector: 'app-lead-page',
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.css'],
})
export class LeadPageComponent implements OnInit {
  currId: number | undefined;
  title: string = '';
  selectedUser: string = '';
  deadline: Date | undefined;
  taskText: string = '';
  usersByTeam: User[] = []; // Initialize as an empty array
  teamId: number = Number(localStorage.getItem("team_id"));
  constructor(
    private leadPageService: LeadPageService,
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getUsersByTeam();
  }

  getUsersByTeam() {
    this.userService.getUser(String(localStorage.getItem("username"))).subscribe((data: User) => {
      this.teamId = data.team_id
    });

    this.leadPageService.getUserByTeam(this.teamId).subscribe(
      (usersByTeam) => {
        this.usersByTeam = usersByTeam;
      },
      (error) => {
        console.error('Error fetching users by team:', error);
      }
    );
  }

  addTeamTask() {
    if (
      this.taskText == '' ||
      this.title == '' ||
      this.selectedUser == '' ||
      this.deadline == undefined
    ) {
      alert('Fill in all fields');
    } else {
      this.userService.getUser(this.selectedUser).subscribe((data: User) => {
        localStorage.setItem('currId', String(data.id))
      });
      const NewTask = {
        created_by: localStorage.getItem('username'),
        deadline: this.deadline,
        title: this.title,
        taskText: this.taskText,
        team: Number(localStorage.getItem("team_id"))
      };
      this.taskService
        .addTask(Number(localStorage.getItem('currId')), NewTask)
        .subscribe((data) => {
          alert(
            `Task added, deadline: ${this.deadline}, title: ${this.title}, description: ${this.taskText},`
          );
          this.deadline = undefined;
          this.taskText = '';
          this.title = '';
          this.selectedUser = '';
        });
        const notification: Notification = {
          message: 'Your team assign you a task',
          user: Number(localStorage.getItem('currId'))
        };

        // console.log(localStorage.getItem('currId'))

        this.notificationService.createNotification(notification).subscribe(
          (response) =>{
            console.log(response)
          }
        )
    }
  }
}
