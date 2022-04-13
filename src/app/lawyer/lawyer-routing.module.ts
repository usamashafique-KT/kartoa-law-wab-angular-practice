import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoasterComponent } from './components/roaster/roaster.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "aboutus",
    component: AboutUsComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "contactus",
    component: ContactUsComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "roaster",
    component: RoasterComponent
  },
  {
    path: "file-manager",
    component: FileManagerComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "add-contact",
    component: AddContactComponent
  },
  {
    path: "edit-contact",
    component: AddContactComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule {


}
