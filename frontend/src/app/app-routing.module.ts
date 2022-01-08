import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { TimerComponent } from './timer/timer.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { EditProjectInfoComponent } from './edit-project-info/edit-project-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AuthGuard } from './guards/auth.guard';
import { EmptyProjectsComponent } from './empty-projects/empty-projects.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'new-entry', component: NewEntryComponent, canActivate: [AuthGuard] },
  { path: 'timer', component: TimerComponent, canActivate: [AuthGuard] },
  { path: 'empty', component: EmptyProjectsComponent },
  {
    path: 'new-project',
    component: NewProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-projects',
    component: ManageProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-username',
    component: ChangeUsernameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-project-info/:id',
    component: EditProjectInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountInfoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
