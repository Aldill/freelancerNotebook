import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { TimerComponent } from './timer/timer.component';
import { NewProjectComponent } from './new-project/new-project.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '$',
  suffix: '',
  thousands: ',',
  nullable: true,
  inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SignupComponent,
    NewEntryComponent,
    TimerComponent,
    NewProjectComponent,
    ManageProjectsComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
