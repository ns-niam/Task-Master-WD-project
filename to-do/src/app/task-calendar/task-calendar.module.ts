// scheduler.module.ts
import { NgModule } from '@angular/core';
import { TaskCalendarComponent } from './task-calendar.component';

@NgModule({
  declarations: [TaskCalendarComponent],
  exports: [TaskCalendarComponent],
})
export class TaskCalendarModule {}
