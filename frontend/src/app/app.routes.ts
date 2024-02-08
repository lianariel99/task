import { Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    {path: 'task-list', component: TaskListComponent},
    {path: '', redirectTo: 'task-list', pathMatch: 'full'}
];
