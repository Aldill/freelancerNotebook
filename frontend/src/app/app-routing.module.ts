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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { EditProjectInfoComponent } from './edit-project-info/edit-project-info.component';
const routes: Routes = [
{path:"",component:LoginComponent},
{path:"home",component:MenuComponent},
{path:"signup",component:SignupComponent},
{path:"new-entry",component:NewEntryComponent},
{path:"timer",component:TimerComponent},
{path: "new-project", component: NewProjectComponent},
{path: "manage-projects", component: ManageProjectsComponent},
{path: "project-details", component: ProjectDetailsComponent},
{path: "settings", component: SettingsComponent},
{path: "account-settings", component: AccountSettingsComponent},
{path: "change-password", component: ChangePasswordComponent},
{path: "change-username", component: ChangeUsernameComponent},
{path: "edit-project-info", component: EditProjectInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
