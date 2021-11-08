import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { TimerComponent } from './timer/timer.component';
import { NewProjectComponent } from './new-project/new-project.component';
const routes: Routes = [
{path:"",component:LoginComponent},
{path:"home",component:MenuComponent},
{path:"signup",component:SignupComponent},
{path:"new-entry",component:NewEntryComponent},
{path:"timer",component:TimerComponent},
{path: "new-project", component: NewProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
