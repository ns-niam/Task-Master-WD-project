import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { scheduler } from 'dhtmlx-scheduler';
import { TaskService } from '../task.service';
import { Task } from '../models';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'task-calendar',
  styleUrls: ['./task-calendar.component.css'],
  templateUrl: './task-calendar.component.html',
})
export class TaskCalendarComponent implements OnInit {
  @ViewChild('taskCalendarContainer', { static: true })
  schedulerContainer!: ElementRef;
  constructor(private personalTasksService: TaskService) {}

  ngOnInit() {
    scheduler.init(this.schedulerContainer.nativeElement, new Date(), 'month');
    this.loadTasks();
  }
  loadTasks(): void {
    this.personalTasksService.getTasks().then((tasks) => {
      this.populateScheduler(tasks);
    });
  }

  populateScheduler(tasks: Task[]): void {
    scheduler.clearAll();

    tasks.forEach((task: Task) => {
      scheduler.addEvent({
        text: task.title,
        start_date: new Date(task.deadline),
        end_date: new Date(task.deadline),
      });
    });
  }
}
