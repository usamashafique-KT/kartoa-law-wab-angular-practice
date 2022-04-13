import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { ClientRoutingModule } from './client-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../components/toast/toast.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    HomeComponent,
    //ToastComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CodeInputModule,
  ]
})
export class ClientModule { }
