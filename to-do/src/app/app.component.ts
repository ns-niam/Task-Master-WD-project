import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskCalendarModule } from './task-calendar/task-calendar.module'; // Import the SchedulerModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TaskCalendarModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'to-do';
  isLogged: boolean = false;

  constructor() {}

  ngOnInit() {}

  protected readonly Boolean = Boolean;
  protected readonly localStorage = localStorage;
}
