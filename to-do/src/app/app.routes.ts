import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HomeComponent } from './home/home.component';
import { PersonalTasksComponent } from './personal-tasks/personal-tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamTasksComponent } from './team-tasks/team-tasks.component';
import { LeadPageComponent } from './lead-page/lead-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent, title: 'Welcome!' },
  { path: 'create-task', component: CreateTaskComponent, title: 'Your tasks' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'personal-tasks',
    component: PersonalTasksComponent,
    title: 'Personal tasks',
  },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  {
    path: 'task-calendar',
    component: TaskCalendarComponent,
    title: 'Task-calendar',
  },
  { path: 'team-tasks', component: TeamTasksComponent, title: 'Team Tasks' },
  { path: 'lead-page', component: LeadPageComponent, title: 'Lead Page' },

  { path: 'create-team', component: CreateTeamComponent, title: 'Create Team' },
  {
    path: 'notifications',
    component: NotificationsComponent,
    title: 'Notifications',
  },
  { path: '**', component: NotfoundComponent, title: '404' },
];
